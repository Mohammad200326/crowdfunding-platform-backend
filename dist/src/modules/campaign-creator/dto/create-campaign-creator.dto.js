"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCampaignCreatorSchema = void 0;
const zod_1 = require("zod");
const BaseSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid({ message: 'Invalid User ID' }),
    assetIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
});
const InstitutionProfileSchema = zod_1.z.object({
    institutionName: zod_1.z.string().min(2, 'Institution name is required'),
    institutionCountry: zod_1.z.string().min(2, 'Country is required'),
    institutionType: zod_1.z.string().min(2, 'Institution type is required'),
    institutionDateOfEstablishment: zod_1.z.coerce.date(),
    institutionLegalStatus: zod_1.z.string().min(1, 'Legal status is required'),
    institutionTaxIdentificationNumber: zod_1.z
        .string()
        .min(1, 'Tax identification number is required'),
    institutionRegistrationNumber: zod_1.z
        .string()
        .min(1, 'Registration number is required'),
    institutionRepresentativeName: zod_1.z
        .string()
        .min(1, 'Representative name is required'),
    institutionRepresentativePosition: zod_1.z
        .string()
        .min(1, 'Representative position is required'),
    institutionRepresentativeRegistrationNumber: zod_1.z
        .string()
        .min(1, 'Representative registration number is required'),
    institutionWebsite: zod_1.z.string().url().optional().or(zod_1.z.literal('')),
    institutionRepresentativeSocialMedia: zod_1.z.string().optional().or(zod_1.z.literal('')),
});
exports.CreateCampaignCreatorSchema = zod_1.z.discriminatedUnion('type', [
    BaseSchema.extend({
        type: zod_1.z.literal('INDIVIDUAL'),
    }),
    BaseSchema.extend({
        type: zod_1.z.literal('INSTITUTION'),
        ...InstitutionProfileSchema.shape,
    }),
]);
//# sourceMappingURL=create-campaign-creator.dto.js.map