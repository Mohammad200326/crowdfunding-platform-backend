import { PartialType } from '@nestjs/swagger';
import { CreateCampaignCreatorDto } from './create-campaign-creator.dto';

export class UpdateCampaignCreatorDto extends PartialType(CreateCampaignCreatorDto) {}
