import { z } from 'zod';
export declare const campaignCreatorValidationSchema: z.ZodObject<{
    type: z.ZodEnum<{
        INDIVIDUAL: "INDIVIDUAL";
        INSTITUTION: "INSTITUTION";
    }>;
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    dateOfBirth: z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>;
    phoneNumber: z.ZodString;
    country: z.ZodString;
    notes: z.ZodString;
    creatorProfile: z.ZodOptional<z.ZodObject<{
        institutionName: z.ZodString;
        institutionCountry: z.ZodString;
        institutionType: z.ZodString;
        institutionDateOfEstablishment: z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>;
        institutionLegalStatus: z.ZodString;
        institutionTaxIdentificationNumber: z.ZodString;
        institutionRegistrationNumber: z.ZodString;
        institutionRepresentativeName: z.ZodString;
        institutionRepresentativePosition: z.ZodString;
        institutionRepresentativeRegistrationNumber: z.ZodString;
        institutionWebsite: z.ZodString;
        institutionRepresentativeSocialMedia: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
