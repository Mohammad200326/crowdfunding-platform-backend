import { Module } from '@nestjs/common';
import { DonorIdentityService } from './donor-identity.service';
import { DonorIdentityController } from './donor-identity.controller';
import { FileModule } from '../file/file.module';

@Module({
  imports: [FileModule],
  controllers: [DonorIdentityController],
  providers: [DonorIdentityService],
})
export class DonorIdentityModule {}
