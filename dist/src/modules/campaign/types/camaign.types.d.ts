import { PaginationQueryType } from 'src/types/util.types';
export type CampaignQuery = PaginationQueryType & {
    title?: string;
};
