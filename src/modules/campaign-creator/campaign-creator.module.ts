import { Module } from '@nestjs/common';
import { CampaignCreatorService } from './campaign-creator.service';
import { CampaignCreatorController } from './campaign-creator.controller';
import { FileModule } from '../file/file.module';

@Module({
  imports: [FileModule],
  controllers: [CampaignCreatorController],
  providers: [CampaignCreatorService],
  exports: [CampaignCreatorService],
})
export class CampaignCreatorModule {}
