import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { FileModule } from '../file/file.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [FileModule, DatabaseModule],
  controllers: [CampaignController],
  providers: [CampaignService],
})
export class CampaignModule {}
