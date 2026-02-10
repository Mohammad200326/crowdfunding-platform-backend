import { DonationService } from './donation.service';
import { CreateDonationCheckoutDto } from './dto/create-donation-checkout.dto';
import { UserResponseDTO } from '../auth/dto/auth.dto';
export declare class DonationController {
    private readonly donationService;
    constructor(donationService: DonationService);
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
