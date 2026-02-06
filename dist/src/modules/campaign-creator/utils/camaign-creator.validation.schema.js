"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaignCreatorValidationSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.campaignCreatorValidationSchema = zod_1.z.object({
    type: zod_1.z.nativeEnum(client_1.CreatorType),
    firstName: zod_1.z.string().min(2).max(100),
    lastName: zod_1.z.string().min(2).max(100),
    email: zod_1.z.string().email().toLowerCase(),
    password: zod_1.z.string().min(6).max(100),
    dateOfBirth: zod_1.z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    })
        .transform((date) => new Date(date)),
    phoneNumber: zod_1.z.string().min(7).max(15),
    country: zod_1.z.string().min(2).max(100),
    notes: zod_1.z.string().max(500),
    creatorProfile: zod_1.z
        .object({
        institutionName: zod_1.z.string().min(2).max(100),
        institutionCountry: zod_1.z.string().min(2).max(100),
        institutionType: zod_1.z.string().min(2).max(200),
        institutionDateOfEstablishment: zod_1.z
            .string()
            .refine((date) => !isNaN(Date.parse(date)), {
            message: 'Invalid date format',
        })
            .transform((date) => new Date(date)),
        institutionLegalStatus: zod_1.z.string().min(2).max(200),
        institutionTaxIdentificationNumber: zod_1.z.string().min(2).max(200),
        institutionRegistrationNumber: zod_1.z.string().min(2).max(200),
        institutionRepresentativeName: zod_1.z.string().min(2).max(200),
        institutionRepresentativePosition: zod_1.z.string().min(2).max(200),
        institutionRepresentativeRegistrationNumber: zod_1.z.string().min(2).max(200),
        institutionWebsite: zod_1.z.string().url(),
        institutionRepresentativeSocialMedia: zod_1.z.string().min(2).max(500),
    })
        .optional(),
});
//# sourceMappingURL=camaign-creator.validation.schema.js.map