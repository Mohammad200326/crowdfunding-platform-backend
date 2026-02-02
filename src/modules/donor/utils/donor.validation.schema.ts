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
    .transform((date) => new Date(date)),
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

export const updateDonorSchema = donorValidationSchema
  .extend(UpdateDonorIdentitySchema.shape)
  .omit({ password: true })
  .partial() satisfies ZodType<UpdateDonorDTO>;
