import { DonationDto } from './donation.swagger.dto';
export declare class PaginatedDonationsResponse {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    items: DonationDto[];
}
