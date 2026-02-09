import { z, ZodType } from 'zod';
import { CreateCampaignDto, UpdateCampaignDto } from '../dto/campaign.dto';
import { paginationSchema } from 'src/modules/auth/util/api.util';
import { CampaignQuery } from '../types/camaign.types';

export const campaignValidationSchema = z.object({
  // creatorId: z.string().uuid(),
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(1000),
  category: z.enum([
    'WATER',
    'HEALTH',
    'ENVIROMENT',
    'FOOD',
    'EDUCATION',
    'SHELTER',
    'ANIMALS',
  ]),
  goal: z.coerce.number().min(1),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().min(new Date()),
  motivationMessage: z.string().min(2).max(1000),
  notes: z.string().max(1000).optional(),
}) satisfies ZodType<CreateCampaignDto>;

export const updateCampaignValidationSchema = campaignValidationSchema
  .partial()
  .extend({
    status: z.enum(['pending', 'confirmed', 'rejected']).optional(),
    isVerified: z.coerce.boolean().optional(),
    verificationStatus: z.enum(['pending', 'confirmed', 'rejected']).optional(),
    isActive: z.coerce.boolean().optional(),
    isDeleted: z.coerce.boolean().optional(),
  })
  .partial() satisfies ZodType<Partial<UpdateCampaignDto>>;

export const campaignPaginationSchema = paginationSchema.extend({
  title: z.string().min(1).max(255).optional(),
}) satisfies ZodType<CampaignQuery>;
