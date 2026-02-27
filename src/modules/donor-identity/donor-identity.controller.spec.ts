import { Test, TestingModule } from '@nestjs/testing';
import { DonorIdentityController } from './donor-identity.controller';
import { DonorIdentityService } from './donor-identity.service';

describe('DonorIdentityController', () => {
  let controller: DonorIdentityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonorIdentityController],
      providers: [DonorIdentityService],
    }).compile();

    controller = module.get<DonorIdentityController>(DonorIdentityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
