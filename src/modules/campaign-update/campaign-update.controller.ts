import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { CampaignStatus } from '@prisma/client';
import { CampaignUpdateService } from './campaign-update.service';
import {
  CreateCampaignUpdateSchema,
  UpdateCampaignUpdateSchema,
} from './dto/campaign-update.dto';
import type {
  CreateCampaignUpdateDto,
  UpdateCampaignUpdateDto,
  CampaignUpdateWithAssetsDto,
} from './dto/campaign-update.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { User } from 'src/utils/decorators/user.decorator';
import { UserResponseDTO } from '../auth/dto/auth.dto';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { FileCleanupInterceptor } from '../file/cleanup-file.interceptor';

@ApiTags('Campaign Updates')
@ApiBearerAuth('access-token')
@Controller('campaign-update')
export class CampaignUpdateController {
  constructor(private readonly campaignUpdateService: CampaignUpdateService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new campaign update' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['campaignId', 'title', 'description'],
      properties: {
        campaignId: {
          type: 'string',
          format: 'uuid',
          description: 'Campaign ID',
        },
        title: { type: 'string', description: 'Update title' },
        description: { type: 'string', description: 'Update description' },
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
          description: 'Media files for the update',
        },
      },
    },
  })
  @ApiCreatedResponse({ description: 'Campaign update created successfully' })
  @Roles(['CAMPAIGN_CREATOR'])
  @UseInterceptors(FilesInterceptor('files', 10), FileCleanupInterceptor)
  async create(
    @Body(new ZodValidationPipe(CreateCampaignUpdateSchema))
    createDto: CreateCampaignUpdateDto,
    @User() user: UserResponseDTO['userData'],
    @UploadedFiles() files?: Express.Multer.File[],
  ): Promise<CampaignUpdateWithAssetsDto> {
    return this.campaignUpdateService.create(createDto, user.id, files);
  }

  @Get()
  @ApiOperation({ summary: 'Get all campaign updates' })
  @ApiQuery({
    name: 'status',
    enum: CampaignStatus,
    required: false,
    description: 'Filter by parent campaign status',
  })
  @ApiOkResponse({ description: 'List of all campaign updates' })
  async findAll(
    @Query('status') status?: CampaignStatus,
  ): Promise<CampaignUpdateWithAssetsDto[]> {
    return this.campaignUpdateService.findAll(status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single campaign update by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({ description: 'Campaign update found' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CampaignUpdateWithAssetsDto> {
    const update = await this.campaignUpdateService.findOne(id);
    if (!update) {
      throw new NotFoundException('Campaign update not found');
    }
    return update;
  }

  @Get('campaign/:campaignId')
  @ApiOperation({ summary: 'Get all updates for a specific campaign' })
  @ApiParam({ name: 'campaignId', type: 'string', format: 'uuid' })
  @ApiQuery({
    name: 'status',
    enum: CampaignStatus,
    required: false,
    description: 'Filter by parent campaign status',
  })
  @ApiOkResponse({
    description: 'List of campaign updates for the specified campaign',
  })
  async findByCampaign(
    @Param('campaignId', ParseUUIDPipe) campaignId: string,
    @Query('status') status?: CampaignStatus,
  ): Promise<CampaignUpdateWithAssetsDto[]> {
    return this.campaignUpdateService.findByCampaign(campaignId, status);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a campaign update' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Update title' },
        description: { type: 'string', description: 'Update description' },
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
          description: 'Additional media files',
        },
      },
    },
  })
  @ApiOkResponse({ description: 'Campaign update updated successfully' })
  @Roles(['CAMPAIGN_CREATOR'])
  @UseInterceptors(FilesInterceptor('files', 10), FileCleanupInterceptor)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(UpdateCampaignUpdateSchema))
    updateDto: UpdateCampaignUpdateDto,
    @User() user: UserResponseDTO['userData'],
    @UploadedFiles() files?: Express.Multer.File[],
  ): Promise<CampaignUpdateWithAssetsDto> {
    return this.campaignUpdateService.update(id, updateDto, user.id, files);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a campaign update' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Campaign update deleted successfully' })
  @Roles(['CAMPAIGN_CREATOR'])
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @User() user: UserResponseDTO['userData'],
  ): Promise<void> {
    await this.campaignUpdateService.remove(id, user.id);
  }

  @Delete(':updateId/asset/:assetId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a specific asset from a campaign update' })
  @ApiParam({ name: 'updateId', type: 'string', format: 'uuid' })
  @ApiParam({ name: 'assetId', type: 'string', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Asset deleted successfully' })
  @Roles(['CAMPAIGN_CREATOR'])
  async removeAsset(
    @Param('updateId', ParseUUIDPipe) updateId: string,
    @Param('assetId', ParseUUIDPipe) assetId: string,
    @User() user: UserResponseDTO['userData'],
  ): Promise<void> {
    await this.campaignUpdateService.removeAsset(updateId, assetId, user.id);
  }
}
