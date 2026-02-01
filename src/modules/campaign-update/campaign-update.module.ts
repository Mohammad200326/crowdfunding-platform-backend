import { Module } from '@nestjs/common';
import { CampaignUpdateController } from './campaign-update.controller';
import { CampaignUpdateService } from './campaign-update.service';
import { DatabaseModule } from '../database/database.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [DatabaseModule, FileModule],
  controllers: [CampaignUpdateController],
  providers: [CampaignUpdateService],
  exports: [CampaignUpdateService],
})
export class CampaignUpdateModule {}
