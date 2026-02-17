"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterCampaignCreatorSchema = void 0;
const zod_1 = require("zod");
const InstitutionDetailsSchema = zod_1.z.object({
    institutionName: zod_1.z.string().min(1),
    institutionType: zod_1.z.string().min(1),
    institutionCountry: zod_1.z.string().min(1),
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
const BaseUserSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    email: zod_1.z.string().trim().toLowerCase().email(),
    password: zod_1.z.string().min(8),
    phoneNumber: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.coerce.date().optional(),
});
exports.RegisterCampaignCreatorSchema = zod_1.z.discriminatedUnion('type', [
    BaseUserSchema.extend({
        type: zod_1.z.literal('INDIVIDUAL'),
        creatorProfile: zod_1.z.null().optional(),
    }),
    BaseUserSchema.extend({
        type: zod_1.z.literal('INSTITUTION'),
        creatorProfile: InstitutionDetailsSchema.optional().nullable(),
    }),
]);
//# sourceMappingURL=register-campaign-creator.schema.js.map