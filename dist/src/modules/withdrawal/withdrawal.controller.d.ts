import { WithdrawalService } from './withdrawal.service';
<<<<<<< HEAD
import type { CreateWithdrawalDto, UpdateWithdrawalStatusDto } from './dto/withdrawal.dto';
=======
import type { CreateWithdrawalDto } from './dto/withdrawal.dto';
>>>>>>> develop
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
<<<<<<< HEAD
=======
    getStripeOnboardingLink(user: UserResponseDTO['userData']): Promise<{
        onboardingUrl: string;
    }>;
>>>>>>> develop
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
<<<<<<< HEAD
    findAllWithdrawals(): Promise<import("./dto/withdrawal.dto").WithdrawalResponseDto[]>;
    findByCreator(creatorId: string): Promise<import("./dto/withdrawal.dto").WithdrawalResponseDto[]>;
    findAll(user: UserResponseDTO['userData']): Promise<import("./dto/withdrawal.dto").WithdrawalResponseDto[]>;
    findOne(id: string, user: UserResponseDTO['userData']): Promise<import("./dto/withdrawal.dto").WithdrawalResponseDto>;
    updateStatus(id: string, updateDto: UpdateWithdrawalStatusDto): Promise<import("./dto/withdrawal.dto").WithdrawalResponseDto>;
=======
    findAll(user: UserResponseDTO['userData']): Promise<import("./dto/withdrawal.dto").WithdrawalResponseDto[]>;
    findOne(id: string, user: UserResponseDTO['userData']): Promise<import("./dto/withdrawal.dto").WithdrawalResponseDto>;
>>>>>>> develop
    cancel(id: string, user: UserResponseDTO['userData']): Promise<import("./dto/withdrawal.dto").WithdrawalResponseDto>;
}
