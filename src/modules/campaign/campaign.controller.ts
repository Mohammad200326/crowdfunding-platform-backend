import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  ParseEnumPipe,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileCleanupInterceptor } from '../file/cleanup-file.interceptor';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import {
  campaignValidationSchema,
  updateCampaignValidationSchema,
  updateCampaignStatusValidationSchema,
} from './utils/camaign.validation';
import { UserResponseDTO } from '../auth/dto/auth.dto';
import { User } from 'src/utils/decorators/user.decorator';
import { Roles } from 'src/utils/decorators/roles.decorator';
import {
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiConsumes,
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import {
  CampaignResponseDto,
  createCampaignApiBody,
  updateCampaignApiBody,
} from './dto/campaign.swagger.dto';
import type { CreateCampaignDto, UpdateCampaignDto } from './dto/campaign.dto'; // Ensure this import exists
import { CampaignCategory, CampaignStatus } from '@prisma/client';
import { IsPublic } from 'src/utils/decorators/public.decorator';

@ApiTags('Campaigns')
@ApiBearerAuth('access-token')
@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @ApiOperation({ summary: 'Create new campaign by campaign creator' })
  @ApiConsumes('multipart/form-data')
  @ApiBody(createCampaignApiBody)
  @Roles(['CAMPAIGN_CREATOR'])
  @UseInterceptors(FileInterceptor('file'), FileCleanupInterceptor)
  create(
    @Body(new ZodValidationPipe(campaignValidationSchema))
    createCampaignDto: CreateCampaignDto,
    @User() user: UserResponseDTO['userData'],
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.campaignService.create(createCampaignDto, user, file);
  }

  @Get()
  @IsPublic(true)
  @ApiOperation({ summary: 'Get all active campaigns (Feed)' })
  @ApiOkResponse({
    description: 'List of all active and non-deleted campaigns',
    type: [CampaignResponseDto],
  })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('status') status?: CampaignStatus,
    @User() user?: UserResponseDTO['userData'],
  ) {
    return this.campaignService.findAll(page, limit, user?.id, status);
  }

  // GET BY CATEGORY
  @Get('category/:category')
  @IsPublic(true)
  @ApiOperation({ summary: 'Filter campaigns by category' })
  @ApiParam({
    name: 'category',
    enum: CampaignCategory,
    description: 'The category to filter by',
  })
  @ApiOkResponse({
    description: 'Filtered campaigns',
    type: [CampaignResponseDto],
  })
  findByCategory(
    @Param('category', new ParseEnumPipe(CampaignCategory))
    category: CampaignCategory,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('status') status?: CampaignStatus,
    @User() user?: UserResponseDTO['userData'],
  ) {
    return this.campaignService.findByCategory(
      category,
      page,
      limit,
      user?.id,
      status,
    );
  }

  // GET BY CREATOR
  @Get('creator/:creatorId')
  @ApiOperation({ summary: 'Get all campaigns by specific creator' })
  @ApiParam({
    name: 'creatorId',
    description: 'UUID of the Campaign Creator (User ID)',
  })
  @ApiOkResponse({
    description: 'List of campaigns by creator',
    type: [CampaignResponseDto],
  })
  findByCreator(
    @Param('creatorId', ParseUUIDPipe) creatorId: string,
    @Query('status') status?: CampaignStatus,
    @User() user?: UserResponseDTO['userData'],
  ) {
    return this.campaignService.findByCreator(creatorId, user?.id, status);
  }

  @Get(':id')
  @IsPublic(true)
  @ApiOperation({ summary: 'Get single campaign by ID' })
  @ApiParam({ name: 'id', description: 'Campaign UUID' })
  @ApiOkResponse({
    description: 'Campaign details',
    type: CampaignResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @User() user?: UserResponseDTO['userData'],
  ) {
    return this.campaignService.findOne(id, user?.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update campaign' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'Campaign UUID' })
  @ApiBody(updateCampaignApiBody)
  @ApiOkResponse({
    description: 'Campaign updated successfully',
    type: CampaignResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  @ApiResponse({
    status: 403,
    description: 'You are not authorized to update this campaign',
  })
  @UseInterceptors(FileInterceptor('file'), FileCleanupInterceptor)
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateCampaignValidationSchema))
    updatePayload: UpdateCampaignDto,
    @User() user: UserResponseDTO['userData'],
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.campaignService.update(id, updatePayload, user, file);
  }

  @Post(':id/like')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Toggle like on a campaign' })
  @ApiParam({ name: 'id', description: 'Campaign UUID' })
  @ApiOkResponse({
    description: 'Like toggled',
    schema: {
      type: 'object',
      properties: { liked: { type: 'boolean' } },
    },
  })
  toggleLike(
    @Param('id', ParseUUIDPipe) id: string,
    @User() user: UserResponseDTO['userData'],
  ) {
    return this.campaignService.toggleLike(id, user.id);
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update campaign status' })
  @ApiParam({ name: 'id', description: 'Campaign UUID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: ['pending', 'confirmed', 'rejected'] },
      },
      required: ['status'],
    },
  })
  @ApiOkResponse({
    description: 'Campaign status updated',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        status: { type: 'string', enum: ['pending', 'confirmed', 'rejected'] },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(updateCampaignStatusValidationSchema))
    body: { status: CampaignStatus },
  ) {
    return this.campaignService.updateStatus(id, body.status);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'delete a campaign (Mark as deleted)' })
  @ApiParam({ name: 'id', description: 'Campaign UUID' })
  @ApiResponse({
    status: 200,
    description: 'Campaign deleted successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        isDeleted: { type: 'boolean', example: true },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.campaignService.softDelete(id);
  }
}
