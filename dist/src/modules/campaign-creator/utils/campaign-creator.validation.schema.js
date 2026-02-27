"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCampaignCreatorValidationSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const InstitutionProfileSchema = zod_1.z.object({
    institutionName: zod_1.z.string().min(1),
    institutionCountry: zod_1.z.string().min(1),
    institutionType: zod_1.z.string().min(1),
    institutionDateOfEstablishment: zod_1.z.coerce.date(),
    institutionLegalStatus: zod_1.z.string().min(1),
    institutionTaxIdentificationNumber: zod_1.z.string().min(1),
    institutionRegistrationNumber: zod_1.z.string().min(1),
    institutionRepresentativeName: zod_1.z.string().min(1),
    institutionRepresentativePosition: zod_1.z.string().min(1),
    institutionRepresentativeRegistrationNumber: zod_1.z.string().min(1),
    institutionWebsite: zod_1.z.string().min(1),
    institutionRepresentativeSocialMedia: zod_1.z.string().min(1),
});
exports.registerCampaignCreatorValidationSchema = zod_1.z.discriminatedUnion('type', [
    zod_1.z.object({
        firstName: zod_1.z.string().min(1),
        lastName: zod_1.z.string().min(1),
        email: zod_1.z.string().trim().toLowerCase().email(),
        password: zod_1.z.string().min(8),
        phoneNumber: zod_1.z.string().min(1),
        country: zod_1.z.string().min(1),
        notes: zod_1.z.string().optional(),
        type: zod_1.z.literal(client_1.CreatorType.INDIVIDUAL),
        creatorProfile: zod_1.z.null().optional(),
    }),
    zod_1.z.object({
        firstName: zod_1.z.string().min(1),
        lastName: zod_1.z.string().min(1),
        email: zod_1.z.string().trim().toLowerCase().email(),
        password: zod_1.z.string().min(8),
        phoneNumber: zod_1.z.string().min(1),
        country: zod_1.z.string().min(1),
        notes: zod_1.z.string().optional(),
        type: zod_1.z.literal(client_1.CreatorType.INSTITUTION),
        creatorProfile: InstitutionProfileSchema,
    }),
]);
//# sourceMappingURL=campaign-creator.validation.schema.js.map