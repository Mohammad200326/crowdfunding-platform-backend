"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCampaignCreatorSchema = void 0;
const zod_1 = require("zod");
exports.UpdateCampaignCreatorSchema = zod_1.z
    .object({
    firstName: zod_1.z.string().min(1).optional(),
    lastName: zod_1.z.string().min(1).optional(),
    phoneNumber: zod_1.z.string().min(7).optional(),
    country: zod_1.z.string().min(2).optional(),
    notes: zod_1.z.string().optional(),
    institutionName: zod_1.z.string().min(2).optional(),
    institutionCountry: zod_1.z.string().min(2).optional(),
    institutionType: zod_1.z.string().min(2).optional(),
    institutionDateOfEstablishment: zod_1.z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    })
        .optional(),
    institutionLegalStatus: zod_1.z.string().min(1).optional(),
    institutionTaxIdentificationNumber: zod_1.z.string().min(1).optional(),
    institutionRegistrationNumber: zod_1.z.string().min(1).optional(),
    institutionRepresentativeName: zod_1.z.string().min(1).optional(),
    institutionRepresentativePosition: zod_1.z.string().min(1).optional(),
    institutionRepresentativeRegistrationNumber: zod_1.z.string().min(1).optional(),
    institutionWebsite: zod_1.z
        .string()
        .refine((val) => {
        if (!val || val.trim() === '')
            return true;
        try {
            new URL(val);
            return true;
        }
        catch {
            return false;
        }
    }, { message: 'Must be a valid URL or leave empty' })
        .optional(),
    institutionRepresentativeSocialMedia: zod_1.z.string().optional(),
})
    .strict();
//# sourceMappingURL=update-campaign-creator.dto.js.map