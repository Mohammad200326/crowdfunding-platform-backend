import { z } from 'zod';
export declare const campaignValidationSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    category: z.ZodEnum<{
        WATER: "WATER";
        HEALTH: "HEALTH";
        ENVIROMENT: "ENVIROMENT";
        FOOD: "FOOD";
        EDUCATION: "EDUCATION";
        SHELTER: "SHELTER";
        ANIMALS: "ANIMALS";
    }>;
    goal: z.ZodCoercedNumber<unknown>;
    startDate: z.ZodCoercedDate<unknown>;
    endDate: z.ZodCoercedDate<unknown>;
    motivationMessage: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateCampaignValidationSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    category: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        WATER: "WATER";
        HEALTH: "HEALTH";
        ENVIROMENT: "ENVIROMENT";
        FOOD: "FOOD";
        EDUCATION: "EDUCATION";
        SHELTER: "SHELTER";
        ANIMALS: "ANIMALS";
    }>>>;
    goal: z.ZodOptional<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    startDate: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    endDate: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    motivationMessage: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodString>>>;
    status: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        confirmed: "confirmed";
        rejected: "rejected";
    }>>>;
    isVerified: z.ZodOptional<z.ZodOptional<z.ZodCoercedBoolean<unknown>>>;
    verificationStatus: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        confirmed: "confirmed";
        rejected: "rejected";
    }>>>;
    isActive: z.ZodOptional<z.ZodOptional<z.ZodCoercedBoolean<unknown>>>;
    isDeleted: z.ZodOptional<z.ZodOptional<z.ZodCoercedBoolean<unknown>>>;
}, z.core.$strip>;
export declare const campaignPaginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    title: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
