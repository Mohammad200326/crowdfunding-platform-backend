import { z } from 'zod';

const InstitutionDetailsSchema = z.object({
  institutionName: z.string().min(1),
  institutionType: z.string().min(1),
  institutionCountry: z.string().min(1),
  institutionDateOfEstablishment: z.coerce.date(),
  institutionLegalStatus: z.string().min(1),
  institutionTaxIdentificationNumber: z.string().min(1),
  institutionRegistrationNumber: z.string().min(1),
  institutionRepresentativeName: z.string().min(1),
  institutionRepresentativePosition: z.string().min(1),
  institutionRepresentativeRegistrationNumber: z.string().min(1),
  institutionWebsite: z.string().min(1),
  institutionRepresentativeSocialMedia: z.string().min(1),
});

const BaseUserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8),
  phoneNumber: z.string().optional(),
  country: z.string().optional(),
  notes: z.string().optional(),
  dateOfBirth: z.coerce.date().optional(),
});

// ✅ discriminated union على string literal
export const RegisterCampaignCreatorSchema = z.discriminatedUnion('type', [
  BaseUserSchema.extend({
    type: z.literal('INDIVIDUAL'),
    creatorProfile: z.null().optional(),
  }),
  BaseUserSchema.extend({
    type: z.literal('INSTITUTION'),
    creatorProfile: InstitutionDetailsSchema.optional().nullable(),
  }),
]);

export type RegisterCampaignCreatorDTO = z.infer<
  typeof RegisterCampaignCreatorSchema
>;
