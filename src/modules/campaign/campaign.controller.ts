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
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileCleanupInterceptor } from '../file/cleanup-file.interceptor';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { campaignValidationSchema } from './utils/camaign.validation';
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
} from './dto/campaign.swagger.dto';
import type { CreateCampaignDto } from './dto/campaign.dto'; // Ensure this import exists
import { CampaignCategory } from '@prisma/client';

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
  @ApiOperation({ summary: 'Get all active campaigns (Feed)' })
  @ApiOkResponse({
    description: 'List of all active and non-deleted campaigns',
    type: [CampaignResponseDto],
  })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.campaignService.findAll(page, limit);
  }

  // GET BY CATEGORY
  @Get('category/:category')
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
  ) {
    return this.campaignService.findByCategory(category, page, limit);
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
  findByCreator(@Param('creatorId', ParseUUIDPipe) creatorId: string) {
    return this.campaignService.findByCreator(creatorId);
  }

  // SOFT DELETE
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft delete a campaign (Mark as deleted)' })
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
