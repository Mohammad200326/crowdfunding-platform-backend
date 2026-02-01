import { z } from 'zod';

export const CreateDonorIdentitySchema = z.object({
  donorId: z.string().uuid(),
  fullNameOnId: z.string().min(2).max(150),
  idNumber: z.string().max(64),
});

export type CreateDonorIdentityDTO = z.infer<typeof CreateDonorIdentitySchema>;

export const UpdateDonorIdentitySchema = z.object({
  fullNameOnId: z.string().min(2).max(150).optional(),
  idNumber: z.string().max(64).optional().nullable(),
});

export type UpdateDonorIdentityDTO = z.infer<typeof UpdateDonorIdentitySchema>;

export type DonorIdentityFiles = {
  idFront: Express.Multer.File[];
  idBack: Express.Multer.File[];
  selfieWithId: Express.Multer.File[];
};

export type CreateDonorIdentityResponse = {
  message: string;
  donorIdentity: {
    id: string;
    donorId: string;
    createdAt: Date;
  };
};

export type DonorIdentityUpdateFiles = {
  idFront?: Express.Multer.File[];
  idBack?: Express.Multer.File[];
  selfieWithId?: Express.Multer.File[];
};

export type UpdateDonorIdentityResponse = {
  message: string;
  donorIdentity: {
    id: string;
    donorId: string;
    fullNameOnId: string;
    idNumber: string | null;
    updatedAt: Date;
  };
};
