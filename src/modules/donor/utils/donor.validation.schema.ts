import { registerDonorDTO } from 'src/modules/auth/dto/auth.dto';
import z, { ZodType } from 'zod';
import { UpdateDonorDTO } from '../dto/donor.dto';
import { UpdateDonorIdentitySchema } from 'src/modules/donor-identity/dto/donor-identity.dto';

export const donorValidationSchema = z.object({
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  email: z.string().email().toLowerCase(),
  password: z.string().min(6).max(100),
  dateOfBirth: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    })
    .transform((dateStr) => {
      const date = new Date(dateStr);
      return new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
      );
    }),
  phoneNumber: z.string().min(7).max(15).optional(),
  country: z.string().min(2).max(100).optional(),
  notes: z.string().max(500).optional(),
  donorProfile: z
    .object({
      areasOfInterest: z.string().min(1).optional(),
      preferredCampaignTypes: z.string().min(1).optional(),
      geographicScope: z.enum(['local', 'global']).optional(),
      targetAudience: z.string().min(2).max(100).optional(),
      preferredCampaignSize: z.coerce.number().positive().optional(),
      preferredCampaignVisibility: z.string().min(2).max(100).optional(),
    })
    .optional(),
}) satisfies ZodType<registerDonorDTO>;

const cleanEmptyStrings = (data: unknown) => {
  if (typeof data !== 'object' || data === null) return data;

  const cleaned: any = { ...data };

  Object.keys(cleaned).forEach((key) => {
    if (cleaned[key] === '') {
      delete cleaned[key];
    }

    if (
      key === 'donorProfile' &&
      typeof cleaned[key] === 'object' &&
      cleaned[key] !== null
    ) {
      const profile = { ...cleaned[key] };
      Object.keys(profile).forEach((pKey) => {
        if (profile[pKey] === '') {
          delete profile[pKey];
        }
      });
      if (Object.keys(profile).length === 0) {
        delete cleaned[key];
      } else {
        cleaned[key] = profile;
      }
    }
  });

  return cleaned;
};

export const updateDonorSchema = z.preprocess(
  cleanEmptyStrings,
  donorValidationSchema
    .extend(UpdateDonorIdentitySchema.shape)
    .omit({ password: true })
    .partial(),
) satisfies ZodType<UpdateDonorDTO>;
