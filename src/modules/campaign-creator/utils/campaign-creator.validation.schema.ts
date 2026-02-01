import { z } from 'zod';
import { CreatorType } from '@prisma/client';
import { RegisterCampaignCreatorDTO } from 'src/modules/auth/dto/register-campaign-creator.schema';

// ✅ Schema لبيانات المؤسسة (بدون type)
const InstitutionProfileSchema = z.object({
  institutionCountry: z.string().min(1),
  institutionType: z.string().min(1),
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

// ✅ الأفضل: discriminatedUnion (يطابق حالتك تماماً)
export const registerCampaignCreatorValidationSchema = z.discriminatedUnion(
  'type',
  [
    z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      email: z.string().trim().toLowerCase().email(),
      password: z.string().min(8),
      phoneNumber: z.string().min(1),
      country: z.string().min(1),
      notes: z.string().optional(),

      // ✅ type top-level
      type: z.literal(CreatorType.INDIVIDUAL),

      // ✅ للفرد: لازم null أو مش موجود
      creatorProfile: z.null().optional(),
    }),
    z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      email: z.string().trim().toLowerCase().email(),
      password: z.string().min(8),
      phoneNumber: z.string().min(1),
      country: z.string().min(1),
      notes: z.string().optional(),

      // ✅ type top-level
      type: z.literal(CreatorType.INSTITUTION),

      // ✅ للمؤسسة: إجباري object
      creatorProfile: InstitutionProfileSchema,
    }),
  ],
) satisfies z.ZodType<RegisterCampaignCreatorDTO>;
