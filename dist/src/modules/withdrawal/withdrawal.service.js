"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawalService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const stripe_service_1 = require("../stripe/stripe.service");
let WithdrawalService = class WithdrawalService {
    prismaService;
    stripeService;
    PLATFORM_FEE_RATE = 0.20;
    constructor(prismaService, stripeService) {
        this.prismaService = prismaService;
        this.stripeService = stripeService;
    }
    getStarValueInMinor() {
        const val = Number(process.env.STAR_VALUE_IN_MINOR ?? 500);
        if (!Number.isFinite(val) || val <= 0) {
            throw new Error('Invalid STAR_VALUE_IN_MINOR');
        }
        return val;
    }
    getCurrency() {
        return (process.env.DEFAULT_CURRENCY ?? 'usd').toLowerCase();
    }
    async getBalance(userId) {
        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
            select: { id: true, role: true, isDeleted: true },
        });
        if (!user || user.isDeleted) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.role !== 'CAMPAIGN_CREATOR') {
            throw new common_1.ForbiddenException('Only campaign creators can view withdrawal balance');
        }
        const campaigns = await this.prismaService.campaign.findMany({
            where: { creatorId: userId, isDeleted: false },
            select: { id: true },
        });
        const campaignIds = campaigns.map((c) => c.id);
        const donationsAggregate = await this.prismaService.donation.aggregate({
            where: {
                campaignId: { in: campaignIds },
                paymentStatus: 'completed',
            },
            _sum: { stars: true },
        });
        const totalStarsReceived = donationsAggregate._sum.stars ?? 0;
        const withdrawnAggregate = await this.prismaService.withdrawal.aggregate({
            where: {
                creatorId: userId,
                status: { in: ['approved', 'paid'] },
            },
            _sum: { starsNumber: true },
        });
        const totalStarsWithdrawn = withdrawnAggregate._sum.starsNumber ?? 0;
        const pendingAggregate = await this.prismaService.withdrawal.aggregate({
            where: {
                creatorId: userId,
                status: 'pending',
            },
            _sum: { starsNumber: true },
        });
        const pendingStars = pendingAggregate._sum.starsNumber ?? 0;
        const availableStars = totalStarsReceived - totalStarsWithdrawn - pendingStars;
        return {
            totalDonationsReceived: totalStarsReceived,
            totalWithdrawn: totalStarsWithdrawn,
            pendingWithdrawals: pendingStars,
            availableBalance: Math.max(0, availableStars),
            currency: this.getCurrency(),
        };
    }
    async createStripeConnectAccount(userId) {
        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
            include: { creatorProfile: true },
        });
        if (!user || user.isDeleted) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.role !== 'CAMPAIGN_CREATOR') {
            throw new common_1.ForbiddenException('Only campaign creators can create Stripe Connect accounts');
        }
        if (user.creatorProfile?.stripeAccountId) {
            throw new common_1.BadRequestException('Stripe Connect account already exists');
        }
        const account = await this.stripeService.createConnectAccount(user.email, {
            userId: user.id,
            creatorId: user.creatorProfile?.id || '',
        });
        await this.prismaService.campaignCreator.update({
            where: { userId: user.id },
            data: { stripeAccountId: account.id },
        });
        const appUrl = process.env.APP_URL ?? 'http://localhost:3000';
        const accountLink = await this.stripeService.createAccountLink(account.id, `${appUrl}/api/v1/withdrawal/stripe/onboarding-refresh`, `${appUrl}/api/v1/withdrawal/stripe/onboarding-complete`);
        return {
            stripeAccountId: account.id,
            onboardingUrl: accountLink.url,
            message: 'Stripe Connect account created. Please complete onboarding.',
        };
    }
    async getStripeOnboardingLink(userId) {
        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
            include: { creatorProfile: true },
        });
        if (!user || user.isDeleted) {
            throw new common_1.NotFoundException('User not found');
        }
        const stripeAccountId = user.creatorProfile?.stripeAccountId;
        if (!stripeAccountId) {
            throw new common_1.BadRequestException('No Stripe Connect account found. Please create one first.');
        }
        const appUrl = process.env.APP_URL ?? 'http://localhost:3000';
        const accountLink = await this.stripeService.createAccountLink(stripeAccountId, `${appUrl}/api/v1/withdrawal/stripe/onboarding-refresh`, `${appUrl}/api/v1/withdrawal/stripe/onboarding-complete`);
        return {
            onboardingUrl: accountLink.url,
        };
    }
    async getStripeAccountStatus(userId) {
        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
            include: { creatorProfile: true },
        });
        if (!user || user.isDeleted) {
            throw new common_1.NotFoundException('User not found');
        }
        const stripeAccountId = user.creatorProfile?.stripeAccountId;
        if (!stripeAccountId) {
            return {
                hasStripeAccount: false,
                isReadyForTransfers: false,
                message: 'No Stripe Connect account. Please create one to receive withdrawals.',
            };
        }
        try {
            const account = await this.stripeService.getConnectAccount(stripeAccountId);
            const isReady = await this.stripeService.isAccountReadyForTransfers(stripeAccountId);
            return {
                hasStripeAccount: true,
                stripeAccountId,
                isReadyForTransfers: isReady,
                chargesEnabled: account.charges_enabled,
                payoutsEnabled: account.payouts_enabled,
                detailsSubmitted: account.details_submitted,
                message: isReady
                    ? 'Account is ready to receive withdrawals.'
                    : 'Please complete Stripe onboarding to receive withdrawals.',
            };
        }
        catch (error) {
            return {
                hasStripeAccount: true,
                stripeAccountId,
                isReadyForTransfers: false,
                error: error.message,
            };
        }
    }
    async create(createWithdrawalDto, userId) {
        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
            select: { id: true, role: true, isDeleted: true, isVerified: true },
        });
        if (!user || user.isDeleted) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.role !== 'CAMPAIGN_CREATOR') {
            throw new common_1.ForbiddenException('Only campaign creators can request withdrawals');
        }
        let bankAccount;
        if (createWithdrawalDto.bankAccountId) {
            bankAccount = await this.prismaService.bankAccount.findUnique({
                where: { id: createWithdrawalDto.bankAccountId },
                select: {
                    id: true,
                    userId: true,
                    isVerified: true,
                    bankName: true,
                    iban: true,
                },
            });
            if (!bankAccount) {
                throw new common_1.NotFoundException('Bank account not found');
            }
            if (bankAccount.userId !== userId) {
                throw new common_1.ForbiddenException('You can only withdraw to your own bank accounts');
            }
        }
        else {
            bankAccount = await this.prismaService.bankAccount.findFirst({
                where: {
                    userId: userId,
                    isVerified: true,
                },
                select: {
                    id: true,
                    userId: true,
                    isVerified: true,
                    bankName: true,
                    iban: true,
                },
                orderBy: { createdAt: 'desc' },
            });
            if (!bankAccount) {
                bankAccount = await this.prismaService.bankAccount.findFirst({
                    where: {
                        userId: userId,
                    },
                    select: {
                        id: true,
                        userId: true,
                        isVerified: true,
                        bankName: true,
                        iban: true,
                    },
                    orderBy: { createdAt: 'desc' },
                });
            }
            if (!bankAccount) {
                throw new common_1.NotFoundException('No bank account found. Please add a bank account first.');
            }
        }
        const balance = await this.getBalance(userId);
        if (createWithdrawalDto.starsNumber > balance.availableBalance) {
            throw new common_1.BadRequestException(`Insufficient balance. Available: ${balance.availableBalance} stars, Requested: ${createWithdrawalDto.starsNumber} stars`);
        }
        const starsRequested = createWithdrawalDto.starsNumber;
        const platformFeeStars = Math.floor(starsRequested * this.PLATFORM_FEE_RATE);
        const netStars = starsRequested - platformFeeStars;
        const withdrawal = await this.prismaService.withdrawal.create({
            data: {
                creatorId: userId,
                bankAccountId: bankAccount.id,
                starsNumber: starsRequested,
                platformFeeStars: platformFeeStars,
                netStars: netStars,
                platformFeeRate: this.PLATFORM_FEE_RATE,
                currency: this.getCurrency(),
                status: 'pending',
            },
            include: {
                bankAccount: {
                    select: {
                        id: true,
                        bankName: true,
                        iban: true,
                    },
                },
            },
        });
        return withdrawal;
    }
    async findAllByUser(userId) {
        const withdrawals = await this.prismaService.withdrawal.findMany({
            where: { creatorId: userId },
            include: {
                bankAccount: {
                    select: {
                        id: true,
                        bankName: true,
                        iban: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return withdrawals;
    }
    async findOne(id, userId) {
        const withdrawal = await this.prismaService.withdrawal.findUnique({
            where: { id },
            include: {
                bankAccount: {
                    select: {
                        id: true,
                        bankName: true,
                        iban: true,
                    },
                },
            },
        });
        if (!withdrawal) {
            throw new common_1.NotFoundException('Withdrawal not found');
        }
        if (withdrawal.creatorId !== userId) {
            throw new common_1.ForbiddenException('You can only view your own withdrawals');
        }
        return withdrawal;
    }
    async cancel(id, userId) {
        const withdrawal = await this.prismaService.withdrawal.findUnique({
            where: { id },
            select: { id: true, creatorId: true, status: true },
        });
        if (!withdrawal) {
            throw new common_1.NotFoundException('Withdrawal not found');
        }
        if (withdrawal.creatorId !== userId) {
            throw new common_1.ForbiddenException('You can only cancel your own withdrawals');
        }
        if (withdrawal.status !== 'pending') {
            throw new common_1.BadRequestException('Only pending withdrawals can be cancelled');
        }
        const updatedWithdrawal = await this.prismaService.withdrawal.update({
            where: { id },
            data: { status: 'rejected', notes: 'Cancelled by user' },
            include: {
                bankAccount: {
                    select: {
                        id: true,
                        bankName: true,
                        iban: true,
                    },
                },
            },
        });
        return updatedWithdrawal;
    }
    async updateStatus(id, status, notes) {
        const withdrawal = await this.prismaService.withdrawal.findUnique({
            where: { id },
            include: {
                creator: {
                    include: {
                        creatorProfile: true,
                    },
                },
            },
        });
        if (!withdrawal) {
            throw new common_1.NotFoundException('Withdrawal not found');
        }
        const updateData = { status };
        if (notes) {
            updateData.notes = notes;
        }
        if (status === 'approved') {
            updateData.approvedAt = new Date();
        }
        if (status === 'paid') {
            const stripeAccountId = withdrawal.creator?.creatorProfile?.stripeAccountId;
            if (!stripeAccountId) {
                throw new common_1.BadRequestException('Creator does not have a Stripe Connect account. Please complete Stripe onboarding first.');
            }
            const isReady = await this.stripeService.isAccountReadyForTransfers(stripeAccountId);
            if (!isReady) {
                throw new common_1.BadRequestException('Stripe Connect account is not ready to receive transfers. Please complete account verification.');
            }
            const amountInMinor = withdrawal.netStars * this.getStarValueInMinor();
            try {
                const transfer = await this.stripeService.createTransfer(amountInMinor, withdrawal.currency, stripeAccountId, {
                    withdrawalId: withdrawal.id,
                    creatorId: withdrawal.creatorId,
                });
                updateData.stripeTransferId = transfer.id;
                updateData.amountInMinor = amountInMinor;
                updateData.paidAt = new Date();
            }
            catch (error) {
                throw new common_1.BadRequestException(`Stripe transfer failed: ${error.message}`);
            }
        }
        const updatedWithdrawal = await this.prismaService.withdrawal.update({
            where: { id },
            data: updateData,
            include: {
                bankAccount: {
                    select: {
                        id: true,
                        bankName: true,
                        iban: true,
                    },
                },
            },
        });
        return updatedWithdrawal;
    }
    async findAll(status) {
        const where = status ? { status } : {};
        const withdrawals = await this.prismaService.withdrawal.findMany({
            where,
            include: {
                bankAccount: {
                    select: {
                        id: true,
                        bankName: true,
                        iban: true,
                    },
                },
                creator: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return withdrawals;
    }
};
exports.WithdrawalService = WithdrawalService;
exports.WithdrawalService = WithdrawalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        stripe_service_1.StripeService])
], WithdrawalService);
//# sourceMappingURL=withdrawal.service.js.map