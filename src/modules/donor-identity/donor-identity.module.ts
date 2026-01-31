import { Module } from '@nestjs/common';
import { DonorIdentityService } from './donor-identity.service';
import { DonorIdentityController } from './donor-identity.controller';

@Module({
  controllers: [DonorIdentityController],
  providers: [DonorIdentityService],
})
export class DonorIdentityModule {}
