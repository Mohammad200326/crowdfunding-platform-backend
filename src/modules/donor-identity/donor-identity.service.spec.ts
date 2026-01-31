import { Test, TestingModule } from '@nestjs/testing';
import { DonorIdentityService } from './donor-identity.service';

describe('DonorIdentityService', () => {
  let service: DonorIdentityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DonorIdentityService],
    }).compile();

    service = module.get<DonorIdentityService>(DonorIdentityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
