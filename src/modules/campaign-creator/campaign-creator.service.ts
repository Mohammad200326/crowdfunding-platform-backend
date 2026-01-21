import { Injectable } from '@nestjs/common';
import { CreateCampaignCreatorDto } from './dto/create-campaign-creator.dto';
import { UpdateCampaignCreatorDto } from './dto/update-campaign-creator.dto';

@Injectable()
export class CampaignCreatorService {
  create(createCampaignCreatorDto: CreateCampaignCreatorDto) {
    return 'This action adds a new campaignCreator';
  }

  findAll() {
    return `This action returns all campaignCreator`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campaignCreator`;
  }

  update(id: number, updateCampaignCreatorDto: UpdateCampaignCreatorDto) {
    return `This action updates a #${id} campaignCreator`;
  }

  remove(id: number) {
    return `This action removes a #${id} campaignCreator`;
  }
}
