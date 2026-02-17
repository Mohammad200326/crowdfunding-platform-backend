import { PaymentStatus } from '@prisma/client';
export declare class DonationDto {
    id: string;
    userId: string;
    campaignId: string;
    stars: number;
    starValueInMinor: number;
    amountInMinor: number;
    currency: string;
    stripeCheckoutSessionId: string | null;
    stripePaymentIntentId: string | null;
    paymentStatus: PaymentStatus;
    paidAt: Date | null;
    failureReason: string | null;
    createdAt: Date;
}
