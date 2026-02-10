import { z } from 'zod';
export declare const registerCampaignCreatorValidationSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    phoneNumber: z.ZodString;
    country: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
    type: z.ZodLiteral<"INDIVIDUAL">;
    creatorProfile: z.ZodOptional<z.ZodNull>;
}, z.core.$strip>, z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    phoneNumber: z.ZodString;
    country: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
    type: z.ZodLiteral<"INSTITUTION">;
    creatorProfile: z.ZodObject<{
        institutionName: z.ZodString;
        institutionCountry: z.ZodString;
        institutionType: z.ZodString;
        institutionDateOfEstablishment: z.ZodCoercedDate<unknown>;
        institutionLegalStatus: z.ZodString;
        institutionTaxIdentificationNumber: z.ZodString;
        institutionRegistrationNumber: z.ZodString;
        institutionRepresentativeName: z.ZodString;
        institutionRepresentativePosition: z.ZodString;
        institutionRepresentativeRegistrationNumber: z.ZodString;
        institutionWebsite: z.ZodString;
        institutionRepresentativeSocialMedia: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>], "type">;
