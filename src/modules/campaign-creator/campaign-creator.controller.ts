import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { CampaignCreatorService } from './campaign-creator.service';
import { CreateCampaignCreatorSchema } from './dto/create-campaign-creator.dto';
import type { CreateCampaignCreatorDto } from './dto/create-campaign-creator.dto';
import type { UpdateCampaignCreatorDto } from './dto/update-campaign-creator.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

@Controller('campaign-creator')
export class CampaignCreatorController {
  constructor(private readonly service: CampaignCreatorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(CreateCampaignCreatorSchema))
  create(@Body() dto: CreateCampaignCreatorDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCampaignCreatorDto: UpdateCampaignCreatorDto,
  ) {
    return this.service.update(+id, updateCampaignCreatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
