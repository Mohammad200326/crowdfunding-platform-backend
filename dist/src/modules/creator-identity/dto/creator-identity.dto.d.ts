import { z } from 'zod';
export declare const CreateCreatorIdentitySchema: z.ZodObject<{
    fullNameOnId: z.ZodString;
    idNumber: z.ZodString;
}, z.core.$strip>;
export type CreateCreatorIdentityDTO = z.infer<typeof CreateCreatorIdentitySchema>;
export declare const UpdateCreatorIdentitySchema: z.ZodObject<{
    fullNameOnId: z.ZodOptional<z.ZodString>;
    idNumber: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type UpdateCreatorIdentityDTO = z.infer<typeof UpdateCreatorIdentitySchema>;
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
