import { WithdrawalService } from './withdrawal.service';
import type { CreateWithdrawalDto, UpdateWithdrawalStatusDto } from './dto/withdrawal.dto';
import { UserResponseDTO } from '../auth/dto/auth.dto';
export declare class WithdrawalController {
    private readonly withdrawalService;
    constructor(withdrawalService: WithdrawalService);
    getBalance(user: UserResponseDTO['userData']): Promise<import("./dto/withdrawal.dto").WithdrawalBalanceDto>;
    createStripeConnect(user: UserResponseDTO['userData']): Promise<{
        stripeAccountId: string;
        onboardingUrl: string;
        message: string;
    }>;
    getStripeAccountStatus(user: UserResponseDTO['userData']): Promise<{
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
    create(createWithdrawalDto: CreateWithdrawalDto, user: UserResponseDTO['userData']): Promise<import("./dto/withdrawal.dto").WithdrawalResponseDto>;
    findAllWithdrawals(): Promise<import("./dto/withdrawal.dto").WithdrawalResponseDto[]>;
    findByCreator(creatorId: string): Promise<import("./dto/withdrawal.dto").WithdrawalResponseDto[]>;
    findAll(user: UserResponseDTO['userData']): Promise<import("./dto/withdrawal.dto").WithdrawalResponseDto[]>;
    platformNetProfit(q: {
        from?: Date;
        to?: Date;
    }): Promise<import("./utils/withdrawal.validation").PlatformNetProfitResponseDto>;
    findOne(id: string, user: UserResponseDTO['userData']): Promise<import("./dto/withdrawal.dto").WithdrawalResponseDto>;
    updateStatus(id: string, updateDto: UpdateWithdrawalStatusDto): Promise<import("./dto/withdrawal.dto").WithdrawalResponseDto>;
    cancel(id: string, user: UserResponseDTO['userData']): Promise<import("./dto/withdrawal.dto").WithdrawalResponseDto>;
}
