import { CampaignStatus } from '@prisma/client';
import { PaginationQueryType } from 'src/types/util.types';
export type CampaignQuery = PaginationQueryType & {
    title?: string;
    status?: CampaignStatus;
};
