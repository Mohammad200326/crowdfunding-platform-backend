import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseFilters,
  UploadedFile,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import type {
  CampaignResponseDTO,
  CreateCampaignDto,
  UpdateCampaignDto,
} from './dto/campaign.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileCleanupInterceptor } from '../file/cleanup-file.interceptor';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { campaignValidationSchema } from './utils/camaign.validation';
import { UserResponseDTO } from '../auth/dto/auth.dto';
import { User } from 'src/utils/decorators/user.decorator';

@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('file'), FileCleanupInterceptor)
  create(
    @Body(new ZodValidationPipe(campaignValidationSchema))
    createCampaignDto: CreateCampaignDto,
    @User() user: UserResponseDTO['userData'],
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<CampaignResponseDTO> {
    return this.campaignService.create(createCampaignDto);
  }

  @Get()
  findAll() {
    return this.campaignService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    return this.campaignService.update(+id, updateCampaignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campaignService.remove(+id);
  }
}
