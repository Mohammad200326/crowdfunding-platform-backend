import { Test, TestingModule } from '@nestjs/testing';
import { CampaignCreatorController } from './campaign-creator.controller';
import { CampaignCreatorService } from './campaign-creator.service';

describe('CampaignCreatorController', () => {
  let controller: CampaignCreatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignCreatorController],
      providers: [CampaignCreatorService],
    }).compile();

    controller = module.get<CampaignCreatorController>(CampaignCreatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
