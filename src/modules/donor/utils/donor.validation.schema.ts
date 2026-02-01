import { registerDonorDTO } from 'src/modules/auth/dto/auth.dto';
import z, { ZodType } from 'zod';
import { updateDonorDTO } from '../dto/donor.dto';

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
    .transform((date) => new Date(date)),
  phoneNumber: z.string().min(7).max(15).optional(),
  country: z.string().min(2).max(100).optional(),
  notes: z.string().max(500).optional(),
  donorProfile: z
    .object({
      areasOfInterest: z.string().min(1),
      preferredCampaignTypes: z.string().min(1),
      geographicScope: z.enum(['local', 'global']),
      targetAudience: z.string().min(2).max(100),
      preferredCampaignSize: z.coerce.number().positive(),
      preferredCampaignVisibility: z.string().min(2).max(100),
    })
    .optional(),
}) satisfies ZodType<registerDonorDTO>;

export const updateDonorSchema =
  donorValidationSchema.partial() satisfies ZodType<updateDonorDTO>;
