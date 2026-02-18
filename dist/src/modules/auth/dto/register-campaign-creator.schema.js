"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterCampaignCreatorFormSchema = exports.RegisterCampaignCreatorSchema = void 0;
const create_campaign_creator_dto_1 = require("../../campaign-creator/dto/create-campaign-creator.dto");
const zod_1 = require("zod");
const BaseUserSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    email: zod_1.z.string().trim().toLowerCase().email(),
    password: zod_1.z.string().min(8),
    phoneNumber: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.coerce.date().optional(),
    assetIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
});
exports.RegisterCampaignCreatorSchema = zod_1.z.discriminatedUnion('type', [
    BaseUserSchema.extend({
        type: zod_1.z.literal('INDIVIDUAL'),
        creatorProfile: zod_1.z.null().optional(),
    }),
    BaseUserSchema.extend({
        type: zod_1.z.literal('INSTITUTION'),
        creatorProfile: create_campaign_creator_dto_1.InstitutionProfileSchema.optional().nullable(),
        institutionDocuments: create_campaign_creator_dto_1.InstitutionDocumentsSchema,
    }),
]);
exports.RegisterCampaignCreatorFormSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    email: zod_1.z.string().trim().toLowerCase().email(),
    password: zod_1.z.string().min(8),
    phoneNumber: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.coerce.date().optional(),
    type: zod_1.z.enum(['INDIVIDUAL', 'INSTITUTION']),
    institutionName: zod_1.z.string().optional(),
    institutionType: zod_1.z.string().optional(),
    institutionCountry: zod_1.z.string().optional(),
    institutionDateOfEstablishment: zod_1.z.preprocess((val) => {
        if (val === '' || val === null || val === undefined)
            return undefined;
        return val;
    }, zod_1.z.coerce.date().optional()),
    institutionLegalStatus: zod_1.z.string().optional(),
    institutionTaxIdentificationNumber: zod_1.z.string().optional(),
    institutionRegistrationNumber: zod_1.z.string().optional(),
    institutionRepresentativeName: zod_1.z.string().optional(),
    institutionRepresentativePosition: zod_1.z.string().optional(),
    institutionRepresentativeRegistrationNumber: zod_1.z.string().optional(),
    institutionWebsite: zod_1.z.string().optional(),
    institutionRepresentativeSocialMedia: zod_1.z.string().optional(),
});
//# sourceMappingURL=register-campaign-creator.schema.js.map