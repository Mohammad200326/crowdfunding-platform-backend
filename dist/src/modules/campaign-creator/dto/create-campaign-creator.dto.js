"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCampaignCreatorSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.CreateCampaignCreatorSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid({ message: 'Invalid User ID' }),
    type: zod_1.z
        .nativeEnum(client_1.CreatorType)
        .refine((val) => Object.values(client_1.CreatorType).includes(val), {
        message: 'Type must be INDIVIDUAL or INSTITUTION',
    }),
    institutionName: zod_1.z.string(),
    institutionCountry: zod_1.z.string().min(1, 'Country is required'),
    institutionType: zod_1.z.string().optional(),
    institutionDateOfEstablishment: zod_1.z.string().optional(),
    institutionLegalStatus: zod_1.z.string().optional(),
    institutionTaxIdentificationNumber: zod_1.z.string().optional(),
    institutionRegistrationNumber: zod_1.z.string().optional(),
    institutionRepresentativeName: zod_1.z.string().optional(),
    institutionRepresentativePosition: zod_1.z.string().optional(),
    institutionRepresentativeRegistrationNumber: zod_1.z.string().optional(),
    institutionWebsite: zod_1.z.string().optional(),
    institutionRepresentativeSocialMedia: zod_1.z.string().optional(),
});
//# sourceMappingURL=create-campaign-creator.dto.js.map