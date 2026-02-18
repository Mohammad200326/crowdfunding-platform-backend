import { DatabaseService } from '../database/database.service';
import { StripeService } from '../stripe/stripe.service';
import { CreateDonationCheckoutDto } from './dto/create-donation-checkout.dto';
import { DonationQueryDto } from './dto/donation-query.dto';
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
        stars: number;
        amountInMinor: number;
        currency: string;
        stripeCheckoutSessionId: string | null;
        stripePaymentIntentId: string | null;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        paidAt: Date | null;
        failureReason: string | null;
    }>;
    private buildPagination;
    getAll(query: DonationQueryDto): Promise<{
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        items: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            campaignId: string;
            stars: number;
            starValueInMinor: number;
            amountInMinor: number;
            currency: string;
            stripeCheckoutSessionId: string | null;
            stripePaymentIntentId: string | null;
            paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
            paidAt: Date | null;
            failureReason: string | null;
        }[];
    }>;
    getByCampaignId(campaignId: string, query: DonationQueryDto): Promise<{
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        items: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            campaignId: string;
            stars: number;
            starValueInMinor: number;
            amountInMinor: number;
            currency: string;
            stripeCheckoutSessionId: string | null;
            stripePaymentIntentId: string | null;
            paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
            paidAt: Date | null;
            failureReason: string | null;
        }[];
    }>;
    getByUserId(userId: string, query: DonationQueryDto): Promise<{
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        items: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            campaignId: string;
            stars: number;
            starValueInMinor: number;
            amountInMinor: number;
            currency: string;
            stripeCheckoutSessionId: string | null;
            stripePaymentIntentId: string | null;
            paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
            paidAt: Date | null;
            failureReason: string | null;
        }[];
    }>;
}
