import { Test, TestingModule } from '@nestjs/testing';
import { CampaignCreatorService } from './campaign-creator.service';

describe('CampaignCreatorService', () => {
  let service: CampaignCreatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampaignCreatorService],
    }).compile();

    service = module.get<CampaignCreatorService>(CampaignCreatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
