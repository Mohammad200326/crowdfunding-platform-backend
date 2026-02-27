import { Module } from '@nestjs/common';
import { CreatorIdentityService } from './creator-identity.service';
import { CreatorIdentityController } from './creator-identity.controller';
import { FileModule } from '../file/file.module';

@Module({
  imports: [FileModule],
  controllers: [CreatorIdentityController],
  providers: [CreatorIdentityService],
  exports: [CreatorIdentityService],
})
export class CreatorIdentityModule {}
