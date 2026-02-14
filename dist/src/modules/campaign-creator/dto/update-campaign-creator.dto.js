"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCampaignCreatorSchema = void 0;
const zod_1 = require("zod");
exports.UpdateCampaignCreatorSchema = zod_1.z
    .object({
    institutionName: zod_1.z
        .string()
        .min(2, 'Institution name must be at least 2 characters')
        .optional(),
    institutionCountry: zod_1.z
        .string()
        .min(2, 'Country must be at least 2 characters')
        .optional(),
    institutionType: zod_1.z
        .string()
        .min(2, 'Institution type must be at least 2 characters')
        .optional(),
    institutionDateOfEstablishment: zod_1.z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    })
        .optional(),
    institutionLegalStatus: zod_1.z
        .string()
        .min(1, 'Legal status cannot be empty')
        .optional(),
    institutionTaxIdentificationNumber: zod_1.z
        .string()
        .min(1, 'Tax identification number cannot be empty')
        .optional(),
    institutionRegistrationNumber: zod_1.z
        .string()
        .min(1, 'Registration number cannot be empty')
        .optional(),
    institutionRepresentativeName: zod_1.z
        .string()
        .min(2, 'Representative name must be at least 2 characters')
        .optional(),
    institutionRepresentativePosition: zod_1.z
        .string()
        .min(2, 'Representative position must be at least 2 characters')
        .optional(),
    institutionRepresentativeRegistrationNumber: zod_1.z
        .string()
        .min(1, 'Representative registration number cannot be empty')
        .optional(),
    institutionWebsite: zod_1.z
        .string()
        .url('Must be a valid URL')
        .or(zod_1.z.literal(''))
        .optional(),
    institutionRepresentativeSocialMedia: zod_1.z
        .string()
        .min(1, 'Social media handle cannot be empty')
        .optional(),
})
    .strict();
//# sourceMappingURL=update-campaign-creator.dto.js.map