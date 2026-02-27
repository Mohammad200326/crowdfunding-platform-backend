import { PaymentStatus } from '@prisma/client';
export declare class DonationQueryDto {
    page?: number;
    limit?: number;
    paymentStatus?: PaymentStatus;
}
