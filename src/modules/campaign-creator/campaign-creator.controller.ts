import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CampaignCreatorService } from './campaign-creator.service';
import { CreateCampaignCreatorDto } from './dto/create-campaign-creator.dto';
import { UpdateCampaignCreatorDto } from './dto/update-campaign-creator.dto';

@Controller('campaign-creator')
export class CampaignCreatorController {
  constructor(private readonly campaignCreatorService: CampaignCreatorService) {}

  @Post()
  create(@Body() createCampaignCreatorDto: CreateCampaignCreatorDto) {
    return this.campaignCreatorService.create(createCampaignCreatorDto);
  }

  @Get()
  findAll() {
    return this.campaignCreatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignCreatorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampaignCreatorDto: UpdateCampaignCreatorDto) {
    return this.campaignCreatorService.update(+id, updateCampaignCreatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campaignCreatorService.remove(+id);
  }
}
