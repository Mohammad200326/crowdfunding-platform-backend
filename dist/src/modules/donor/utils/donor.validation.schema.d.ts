import z from 'zod';
export declare const donorValidationSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    dateOfBirth: z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>;
    phoneNumber: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    donorProfile: z.ZodOptional<z.ZodObject<{
        areasOfInterest: z.ZodOptional<z.ZodString>;
        preferredCampaignTypes: z.ZodOptional<z.ZodString>;
        geographicScope: z.ZodOptional<z.ZodEnum<{
            local: "local";
            global: "global";
        }>>;
        targetAudience: z.ZodOptional<z.ZodString>;
        preferredCampaignSize: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        preferredCampaignVisibility: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const updateDonorSchema: z.ZodPipe<z.ZodTransform<any, unknown>, z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    dateOfBirth: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>>;
    country: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    phoneNumber: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    donorProfile: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        areasOfInterest: z.ZodOptional<z.ZodString>;
        preferredCampaignTypes: z.ZodOptional<z.ZodString>;
        geographicScope: z.ZodOptional<z.ZodEnum<{
            local: "local";
            global: "global";
        }>>;
        targetAudience: z.ZodOptional<z.ZodString>;
        preferredCampaignSize: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        preferredCampaignVisibility: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
    fullNameOnId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    idNumber: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
}, z.core.$strip>>;
