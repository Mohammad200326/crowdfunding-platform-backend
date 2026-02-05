import { z } from 'zod';
export declare const CreateDonorIdentitySchema: z.ZodObject<{
    fullNameOnId: z.ZodString;
    idNumber: z.ZodString;
}, z.core.$strip>;
export type CreateDonorIdentityDTO = z.infer<typeof CreateDonorIdentitySchema>;
export declare const UpdateDonorIdentitySchema: z.ZodObject<{
    fullNameOnId: z.ZodOptional<z.ZodString>;
    idNumber: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
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
