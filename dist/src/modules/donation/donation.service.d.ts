import { DatabaseService } from '../database/database.service';
import { StripeService } from '../stripe/stripe.service';
import { CreateDonationCheckoutDto } from './dto/create-donation-checkout.dto';
export declare class DonationService {
    private readonly databaseService;
    private readonly stripeService;
    constructor(databaseService: DatabaseService, stripeService: StripeService);
    private getStarValueInMinor;
    private getCurrency;
    createCheckout(dto: CreateDonationCheckoutDto, userId: string): Promise<{
        donationId: string;
        checkoutUrl: string;
    }>;
    getById(id: string): Promise<{
        id: string;
        createdAt: Date;
        amountInMinor: number;
        currency: string;
        paidAt: Date | null;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        stars: number;
        stripeCheckoutSessionId: string | null;
        stripePaymentIntentId: string | null;
        failureReason: string | null;
    }>;
}
