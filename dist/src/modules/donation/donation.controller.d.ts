import { DonationService } from './donation.service';
import { CreateDonationCheckoutDto } from './dto/create-donation-checkout.dto';
import { UserResponseDTO } from '../auth/dto/auth.dto';
import { DonationQueryDto } from './dto/donation-query.dto';
export declare class DonationController {
    private readonly donationService;
    constructor(donationService: DonationService);
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
            amountInMinor: number;
            currency: string;
            paidAt: Date | null;
            paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
            stars: number;
            starValueInMinor: number;
            stripeCheckoutSessionId: string | null;
            stripePaymentIntentId: string | null;
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
            amountInMinor: number;
            currency: string;
            paidAt: Date | null;
            paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
            stars: number;
            starValueInMinor: number;
            stripeCheckoutSessionId: string | null;
            stripePaymentIntentId: string | null;
            failureReason: string | null;
        }[];
    }>;
    getMyDonations(user: UserResponseDTO['userData'], query: DonationQueryDto): Promise<{
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
            amountInMinor: number;
            currency: string;
            paidAt: Date | null;
            paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
            stars: number;
            starValueInMinor: number;
            stripeCheckoutSessionId: string | null;
            stripePaymentIntentId: string | null;
            failureReason: string | null;
        }[];
    }>;
    createCheckout(dto: CreateDonationCheckoutDto, user: UserResponseDTO['userData']): Promise<{
        donationId: string;
        checkoutUrl: string;
    }>;
    getDonation(id: string): Promise<{
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
