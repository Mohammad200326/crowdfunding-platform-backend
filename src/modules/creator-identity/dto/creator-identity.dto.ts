import { z } from 'zod';

export const CreateCreatorIdentitySchema = z.object({
  fullNameOnId: z.string().min(2).max(150),
  idNumber: z.string().max(64),
});

export type CreateCreatorIdentityDTO = z.infer<
  typeof CreateCreatorIdentitySchema
>;

export const UpdateCreatorIdentitySchema = z.object({
  fullNameOnId: z.string().min(2).max(150).optional(),
  idNumber: z.string().max(64).optional().nullable(),
});

export type UpdateCreatorIdentityDTO = z.infer<
  typeof UpdateCreatorIdentitySchema
>;

export type CreatorIdentityFiles = {
  idFront: Express.Multer.File[];
  idBack: Express.Multer.File[];
  selfieWithId: Express.Multer.File[];
};

export type CreateCreatorIdentityResponse = {
  message: string;
  creatorIdentity: {
    id: string;
    creatorId: string;
    createdAt: Date;
  };
};

export type CreatorIdentityUpdateFiles = {
  idFront?: Express.Multer.File[];
  idBack?: Express.Multer.File[];
  selfieWithId?: Express.Multer.File[];
};

export type UpdateCreatorIdentityResponse = {
  message: string;
  creatorIdentity: {
    id: string;
    creatorId: string;
    fullNameOnId: string;
    idNumber: string | null;
    updatedAt: Date;
  };
};
