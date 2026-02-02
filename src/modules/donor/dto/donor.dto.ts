import { Prisma } from '@prisma/client';
import { registerDonorDTO } from 'src/modules/auth/dto/auth.dto';
import { UpdateDonorIdentityDTO } from 'src/modules/donor-identity/dto/donor-identity.dto';

export type UpdateDonorDTO = Partial<registerDonorDTO> &
  Partial<UpdateDonorIdentityDTO>;

export type DonorResponseDTO = Prisma.DonorGetPayload<{
  include: {
    identity: { include: { assets: true } };
    user: { omit: { password: true } };
  };
}>;
