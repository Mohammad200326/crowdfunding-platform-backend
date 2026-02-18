import {
  InstitutionDocumentsSchema,
  InstitutionProfileSchema,
} from 'src/modules/campaign-creator/dto/create-campaign-creator.dto';
import { z } from 'zod';

// const InstitutionDetailsSchema = z.object({
//   institutionName: z.string().min(1),
//   institutionType: z.string().min(1),
//   institutionCountry: z.string().min(1),
//   institutionDateOfEstablishment: z.coerce.date(),
//   institutionLegalStatus: z.string().min(1),
//   institutionTaxIdentificationNumber: z.string().min(1),
//   institutionRegistrationNumber: z.string().min(1),
//   institutionRepresentativeName: z.string().min(1),
//   institutionRepresentativePosition: z.string().min(1),
//   institutionRepresentativeRegistrationNumber: z.string().min(1),
//   institutionWebsite: z.string().min(1),
//   institutionRepresentativeSocialMedia: z.string().min(1),
// });

const BaseUserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8),
  phoneNumber: z.string().optional(),
  country: z.string().optional(),
  notes: z.string().optional(),
  dateOfBirth: z.coerce.date().optional(),

  assetIds: z.array(z.string().uuid()).optional(),
});

// ✅ discriminated union على string literal
export const RegisterCampaignCreatorSchema = z.discriminatedUnion('type', [
  BaseUserSchema.extend({
    type: z.literal('INDIVIDUAL'),
    creatorProfile: z.null().optional(),
  }),
  BaseUserSchema.extend({
    type: z.literal('INSTITUTION'),
    creatorProfile: InstitutionProfileSchema.optional().nullable(),

    institutionDocuments: InstitutionDocumentsSchema,
  }),
]);

export type RegisterCampaignCreatorDTO = z.infer<
  typeof RegisterCampaignCreatorSchema
>;

// register-campaign-creator.form.schema.ts
export const RegisterCampaignCreatorFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8),

  phoneNumber: z.string().optional(),
  country: z.string().optional(),
  notes: z.string().optional(),
  dateOfBirth: z.coerce.date().optional(),

  type: z.enum(['INDIVIDUAL', 'INSTITUTION']),

  // institution fields (all optional)
  institutionName: z.string().optional(),
  institutionType: z.string().optional(),
  institutionCountry: z.string().optional(),
  institutionDateOfEstablishment: z.preprocess((val) => {
    if (val === '' || val === null || val === undefined) return undefined;
    return val;
  }, z.coerce.date().optional()),
  institutionLegalStatus: z.string().optional(),
  institutionTaxIdentificationNumber: z.string().optional(),
  institutionRegistrationNumber: z.string().optional(),
  institutionRepresentativeName: z.string().optional(),
  institutionRepresentativePosition: z.string().optional(),
  institutionRepresentativeRegistrationNumber: z.string().optional(),
  institutionWebsite: z.string().optional(),
  institutionRepresentativeSocialMedia: z.string().optional(),
});

export type RegisterCampaignCreatorFormDTO = z.infer<
  typeof RegisterCampaignCreatorFormSchema
>;
