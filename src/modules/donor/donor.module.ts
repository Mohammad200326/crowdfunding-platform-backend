import { Module } from '@nestjs/common';
import { DonorService } from './donor.service';
import { DonorController } from './donor.controller';
import { FileModule } from '../file/file.module';
import { DonorIdentityModule } from '../donor-identity/donor-identity.module';

@Module({
  controllers: [DonorController],
  providers: [DonorService],
  exports: [DonorService],
  imports: [FileModule, DonorIdentityModule],
})
export class DonorModule {}
