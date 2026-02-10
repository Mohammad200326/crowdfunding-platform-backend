import { CreateWithdrawalDto, WithdrawalResponseDto, WithdrawalBalanceDto } from './dto/withdrawal.dto';
import { DatabaseService } from '../database/database.service';
import { StripeService } from '../stripe/stripe.service';
import { WithdrawalStatus } from '@prisma/client';
export declare class WithdrawalService {
    private readonly prismaService;
    private readonly stripeService;
    private readonly PLATFORM_FEE_RATE;
    constructor(prismaService: DatabaseService, stripeService: StripeService);
    private getStarValueInMinor;
    private getCurrency;
    getBalance(userId: string): Promise<WithdrawalBalanceDto>;
    createStripeConnectAccount(userId: string): Promise<{
        stripeAccountId: string;
        onboardingUrl: string;
        message: string;
    }>;
    getStripeOnboardingLink(userId: string): Promise<{
        onboardingUrl: string;
    }>;
    getStripeAccountStatus(userId: string): Promise<{
        hasStripeAccount: boolean;
        isReadyForTransfers: boolean;
        message: string;
        stripeAccountId?: undefined;
        chargesEnabled?: undefined;
        payoutsEnabled?: undefined;
        detailsSubmitted?: undefined;
        error?: undefined;
    } | {
        hasStripeAccount: boolean;
        stripeAccountId: string;
        isReadyForTransfers: boolean;
        chargesEnabled: boolean;
        payoutsEnabled: boolean;
        detailsSubmitted: boolean;
        message: string;
        error?: undefined;
    } | {
        hasStripeAccount: boolean;
        stripeAccountId: string;
        isReadyForTransfers: boolean;
        error: any;
        message?: undefined;
        chargesEnabled?: undefined;
        payoutsEnabled?: undefined;
        detailsSubmitted?: undefined;
    }>;
    create(createWithdrawalDto: CreateWithdrawalDto, userId: string): Promise<WithdrawalResponseDto>;
    findAllByUser(userId: string): Promise<WithdrawalResponseDto[]>;
    findOne(id: string, userId: string): Promise<WithdrawalResponseDto>;
    cancel(id: string, userId: string): Promise<WithdrawalResponseDto>;
    updateStatus(id: string, status: WithdrawalStatus, notes?: string): Promise<WithdrawalResponseDto>;
    findAll(status?: WithdrawalStatus): Promise<WithdrawalResponseDto[]>;
}
