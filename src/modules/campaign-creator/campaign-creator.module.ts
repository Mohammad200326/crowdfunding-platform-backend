import { Module } from '@nestjs/common';
import { CampaignCreatorService } from './campaign-creator.service';
import { CampaignCreatorController } from './campaign-creator.controller';

@Module({
  controllers: [CampaignCreatorController],
  providers: [CampaignCreatorService],
})
export class CampaignCreatorModule {}
