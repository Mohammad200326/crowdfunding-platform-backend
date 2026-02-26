"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCampaignCreatorSchema = exports.InstitutionProfileSchema = exports.InstitutionDocumentsSchema = void 0;
const zod_1 = require("zod");
exports.InstitutionDocumentsSchema = zod_1.z
    .object({
    registrationCertificateId: zod_1.z.string().uuid().optional(),
    commercialLicenseId: zod_1.z.string().uuid().optional(),
    representativeIdPhotoId: zod_1.z.string().uuid().optional(),
    commissionerImageId: zod_1.z.string().uuid().optional(),
    authorizationLetterId: zod_1.z.string().uuid().optional(),
})
    .optional();
const BaseSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid({ message: 'Invalid User ID' }),
    assetIds: zod_1.z.array(zod_1.z.string().uuid()).optional(),
});
exports.InstitutionProfileSchema = zod_1.z.object({
    institutionName: zod_1.z.string().min(2).optional(),
    institutionCountry: zod_1.z.string().min(2).optional(),
    institutionType: zod_1.z.string().min(2).optional(),
    institutionDateOfEstablishment: zod_1.z.coerce.date().optional(),
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
});
exports.CreateCampaignCreatorSchema = zod_1.z.discriminatedUnion('type', [
    BaseSchema.extend({
        type: zod_1.z.literal('INDIVIDUAL'),
    }),
    BaseSchema.extend({
        type: zod_1.z.literal('INSTITUTION'),
        ...exports.InstitutionProfileSchema.shape,
        institutionDocuments: exports.InstitutionDocumentsSchema,
    }),
]);
//# sourceMappingURL=create-campaign-creator.dto.js.map