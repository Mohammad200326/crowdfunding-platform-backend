import { z } from 'zod';

export const InstitutionDocumentsSchema = z
  .object({
    registrationCertificateId: z.string().uuid().optional(),
    commercialLicenseId: z.string().uuid().optional(),
    representativeIdPhotoId: z.string().uuid().optional(),
    commissionerImageId: z.string().uuid().optional(),
    authorizationLetterId: z.string().uuid().optional(),
  })
  .optional();

const BaseSchema = z.object({
  userId: z.string().uuid({ message: 'Invalid User ID' }),
  assetIds: z.array(z.string().uuid()).optional(),
});

// All institution fields are optional
export const InstitutionProfileSchema = z.object({
  institutionName: z.string().min(2).optional(),
  institutionCountry: z.string().min(2).optional(),
  institutionType: z.string().min(2).optional(),
  institutionDateOfEstablishment: z.coerce.date().optional(),
  institutionLegalStatus: z.string().min(1).optional(),
  institutionTaxIdentificationNumber: z.string().min(1).optional(),
  institutionRegistrationNumber: z.string().min(1).optional(),
  institutionRepresentativeName: z.string().min(1).optional(),
  institutionRepresentativePosition: z.string().min(1).optional(),
  institutionRepresentativeRegistrationNumber: z.string().min(1).optional(),
  institutionWebsite: z
    .string()
    .refine(
      (val) => {
        if (!val || val.trim() === '') return true;
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: 'Must be a valid URL or leave empty' },
    )
    .optional(),
  institutionRepresentativeSocialMedia: z.string().optional(),
});

export const CreateCampaignCreatorSchema = z.discriminatedUnion('type', [
  BaseSchema.extend({
    type: z.literal('INDIVIDUAL'),
  }),

  BaseSchema.extend({
    type: z.literal('INSTITUTION'),
    ...InstitutionProfileSchema.shape,

    institutionDocuments: InstitutionDocumentsSchema,
  }),
]);

export type CreateCampaignCreatorDto = z.infer<
  typeof CreateCampaignCreatorSchema
>;
