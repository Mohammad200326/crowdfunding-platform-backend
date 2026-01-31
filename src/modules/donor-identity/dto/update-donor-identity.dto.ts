import { PartialType } from '@nestjs/swagger';
import { CreateDonorIdentityDto } from './create-donor-identity.dto';

export class UpdateDonorIdentityDto extends PartialType(CreateDonorIdentityDto) {}
