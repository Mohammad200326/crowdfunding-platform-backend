import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import {
  CreateWithdrawalDto,
  WithdrawalResponseDto,
  WithdrawalBalanceDto,
} from './dto/withdrawal.dto';
import { DatabaseService } from '../database/database.service';
import { StripeService } from '../stripe/stripe.service';
import { Prisma, WithdrawalStatus } from '@prisma/client';
import { PlatformNetProfitResponseDto } from './utils/withdrawal.validation';

@Injectable()
export class WithdrawalService {
  private readonly PLATFORM_FEE_RATE = 0.20; // 20% platform fee

  constructor(
    private readonly prismaService: DatabaseService,
    private readonly stripeService: StripeService,
  ) {}

  private getStarValueInMinor(): number {
    const val = Number(process.env.STAR_VALUE_IN_MINOR ?? 500);
    if (!Number.isFinite(val) || val <= 0) {
      throw new Error('Invalid STAR_VALUE_IN_MINOR');
    }
    return val;
  }

  private getCurrency(): string {
    return (process.env.DEFAULT_CURRENCY ?? 'usd').toLowerCase();
  }

  /**
   * Get the available balance for a campaign creator
   */
  async getBalance(userId: string): Promise<WithdrawalBalanceDto> {
    // Verify user is a campaign creator
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true, isDeleted: true },
    });

    if (!user || user.isDeleted) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== 'CAMPAIGN_CREATOR') {
      throw new ForbiddenException(
        'Only campaign creators can view withdrawal balance',
      );
    }

    // Get all campaigns by this creator
    const campaigns = await this.prismaService.campaign.findMany({
      where: { creatorId: userId, isDeleted: false },
      select: { id: true },
    });

    const campaignIds = campaigns.map((c) => c.id);

    // Calculate total donations received (only completed payments)
    const donationsAggregate = await this.prismaService.donation.aggregate({
      where: {
        campaignId: { in: campaignIds },
        paymentStatus: 'completed',
      },
      _sum: { stars: true },
    });

    const totalStarsReceived = donationsAggregate._sum.stars ?? 0;

    // Calculate total withdrawn (approved + paid)
    const withdrawnAggregate = await this.prismaService.withdrawal.aggregate({
      where: {
        creatorId: userId,
        status: { in: ['approved', 'paid'] },
      },
      _sum: { starsNumber: true },
    });

    const totalStarsWithdrawn = withdrawnAggregate._sum.starsNumber ?? 0;

    // Calculate pending withdrawals
    const pendingAggregate = await this.prismaService.withdrawal.aggregate({
      where: {
        creatorId: userId,
        status: 'pending',
      },
      _sum: { starsNumber: true },
    });

    const pendingStars = pendingAggregate._sum.starsNumber ?? 0;

    // Available balance = total received - withdrawn - pending
    const availableStars =
      totalStarsReceived - totalStarsWithdrawn - pendingStars;

    return {
      totalDonationsReceived: totalStarsReceived,
      totalWithdrawn: totalStarsWithdrawn,
      pendingWithdrawals: pendingStars,
      availableBalance: Math.max(0, availableStars),
      currency: this.getCurrency(),
    };
  }

  /**
   * Create a Stripe Connect account for a campaign creator
   */
  async createStripeConnectAccount(userId: string) {
    // Get user with creator profile
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: { creatorProfile: true },
    });

    if (!user || user.isDeleted) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== 'CAMPAIGN_CREATOR') {
      throw new ForbiddenException(
        'Only campaign creators can create Stripe Connect accounts',
      );
    }

    // Check if already has a Stripe account
    if (user.creatorProfile?.stripeAccountId) {
      throw new BadRequestException('Stripe Connect account already exists');
    }

    // Create Stripe Connect account
    const account = await this.stripeService.createConnectAccount(user.email, {
      userId: user.id,
      creatorId: user.creatorProfile?.id || '',
    });

    // Save Stripe account ID to database
    await this.prismaService.campaignCreator.update({
      where: { userId: user.id },
      data: { stripeAccountId: account.id },
    });

    // Generate onboarding link
    const appUrl = process.env.APP_URL ?? 'http://localhost:3000';
    const accountLink = await this.stripeService.createAccountLink(
      account.id,
      `${appUrl}/api/v1/withdrawal/stripe/onboarding-refresh`,
      `${appUrl}/api/v1/withdrawal/stripe/onboarding-complete`,
    );

    return {
      stripeAccountId: account.id,
      onboardingUrl: accountLink.url,
      message: 'Stripe Connect account created. Please complete onboarding.',
    };
  }

  /**
   * Get Stripe onboarding link for existing account
   */
  // async getStripeOnboardingLink(userId: string) {
  //   const user = await this.prismaService.user.findUnique({
  //     where: { id: userId },
  //     include: { creatorProfile: true },
  //   });

  //   if (!user || user.isDeleted) {
  //     throw new NotFoundException('User not found');
  //   }

  //   const stripeAccountId = user.creatorProfile?.stripeAccountId;
  //   if (!stripeAccountId) {
  //     throw new BadRequestException(
  //       'No Stripe Connect account found. Please create one first.',
  //     );
  //   }

  //   const appUrl = process.env.APP_URL ?? 'http://localhost:3000';
  //   const accountLink = await this.stripeService.createAccountLink(
  //     stripeAccountId,
  //     `${appUrl}/api/v1/withdrawal/stripe/onboarding-refresh`,
  //     `${appUrl}/api/v1/withdrawal/stripe/onboarding-complete`,
  //   );

  //   return {
  //     onboardingUrl: accountLink.url,
  //   };
  // }

  /**
   * Get Stripe Connect account status
   */
  async getStripeAccountStatus(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: { creatorProfile: true },
    });

    if (!user || user.isDeleted) {
      throw new NotFoundException('User not found');
    }

    const stripeAccountId = user.creatorProfile?.stripeAccountId;
    if (!stripeAccountId) {
      return {
        hasStripeAccount: false,
        isReadyForTransfers: false,
        message:
          'No Stripe Connect account. Please create one to receive withdrawals.',
      };
    }

    try {
      const account =
        await this.stripeService.getConnectAccount(stripeAccountId);
      const isReady =
        await this.stripeService.isAccountReadyForTransfers(stripeAccountId);

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
    } catch (error) {
      return {
        hasStripeAccount: true,
        stripeAccountId,
        isReadyForTransfers: false,
        error: error.message,
      };
    }
  }

  /**
   * Create a new withdrawal request
   */
  async create(
    createWithdrawalDto: CreateWithdrawalDto,
    userId: string,
  ): Promise<WithdrawalResponseDto> {
    // Verify user is a campaign creator
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: { creatorProfile: { select: { stripeAccountId: true } } },
    });

    if (!user || user.isDeleted) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== 'CAMPAIGN_CREATOR') {
      throw new ForbiddenException(
        'Only campaign creators can request withdrawals',
      );
    }

    // if (!user.isVerified) {
    //   throw new ForbiddenException(
    //     'Your account must be verified before you can withdraw funds',
    //   );
    // }

    // Get bank account - either from DTO or fetch the user's verified bank account
    let bankAccount;

    if (createWithdrawalDto.bankAccountId) {
      // Use the provided bank account ID
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
        throw new NotFoundException('Bank account not found');
      }

      if (bankAccount.userId !== userId) {
        throw new ForbiddenException(
          'You can only withdraw to your own bank accounts',
        );
      }
    } else {
      // Auto-fetch the user's bank account (try verified first, then any)
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

      // If no verified bank account, try to get any bank account (for testing)
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
        throw new NotFoundException(
          'No bank account found. Please add a bank account first.',
        );
      }
    }

    // if (!bankAccount.isVerified) {
    //   throw new BadRequestException(
    //     'Bank account must be verified before withdrawals',
    //   );
    // }

    // Verify bank account matches the one registered in Stripe Connect
    const stripeAccountId = user.creatorProfile?.stripeAccountId;
    if (!stripeAccountId) {
      throw new BadRequestException(
        'No Stripe Connect account found. Please complete Stripe onboarding before requesting a withdrawal.',
      );
    }

    const stripeBankAccounts =
      await this.stripeService.listExternalBankAccounts(stripeAccountId);

    if (!stripeBankAccounts || stripeBankAccounts.length === 0) {
      throw new BadRequestException(
        'No bank account found in Stripe Connect. Please add a bank account through Stripe onboarding.',
      );
    }

    const normalizedIban = bankAccount.iban.replace(/\s+/g, '').toUpperCase();
    const ibanLast4 = normalizedIban.slice(-4);

    const matchFound = stripeBankAccounts.some(
      (stripeBankAcc) => stripeBankAcc.last4 === ibanLast4,
    );

    if (!matchFound) {
      throw new BadRequestException(
        `Bank account mismatch: the bank account on file (IBAN ending in ${ibanLast4}) does not match any bank account registered in Stripe. ` +
        'Please make sure the same bank account is used on both the platform and Stripe Connect.',
      );
    }

    // Check available balance
    const balance = await this.getBalance(userId);

    if (createWithdrawalDto.starsNumber > balance.availableBalance) {
      throw new BadRequestException(
        `Insufficient balance. Available: ${balance.availableBalance} stars, Requested: ${createWithdrawalDto.starsNumber} stars`,
      );
    }

    // Calculate platform fee (20%)
    const starsRequested = createWithdrawalDto.starsNumber;
    const platformFeeStars = Math.floor(starsRequested * this.PLATFORM_FEE_RATE);
    const netStars = starsRequested - platformFeeStars;

    // Create withdrawal request
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

    return withdrawal as WithdrawalResponseDto;
  }

  /**
   * Get all withdrawals for a campaign creator
   */
  async findAllByUser(userId: string): Promise<WithdrawalResponseDto[]> {
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

    return withdrawals as WithdrawalResponseDto[];
  }

  /**
   * Get a single withdrawal by ID
   */
  async findOne(id: string, userId: string): Promise<WithdrawalResponseDto> {
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
      throw new NotFoundException('Withdrawal not found');
    }

    if (withdrawal.creatorId !== userId) {
      throw new ForbiddenException('You can only view your own withdrawals');
    }

    return withdrawal as WithdrawalResponseDto;
  }

  /**
   * Cancel a pending withdrawal
   */
  async cancel(id: string, userId: string): Promise<WithdrawalResponseDto> {
    const withdrawal = await this.prismaService.withdrawal.findUnique({
      where: { id },
      select: { id: true, creatorId: true, status: true },
    });

    if (!withdrawal) {
      throw new NotFoundException('Withdrawal not found');
    }

    if (withdrawal.creatorId !== userId) {
      throw new ForbiddenException('You can only cancel your own withdrawals');
    }

    if (withdrawal.status !== 'pending') {
      throw new BadRequestException(
        'Only pending withdrawals can be cancelled',
      );
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

    return updatedWithdrawal as WithdrawalResponseDto;
  }

  /**
   * Admin: Update withdrawal status
   */
  async updateStatus(
    id: string,
    status: WithdrawalStatus,
    notes?: string,
  ): Promise<WithdrawalResponseDto> {
    const withdrawal = await this.prismaService.withdrawal.findUnique({
      where: { id },
      include: {
        bankAccount: {
          select: {
            id: true,
            iban: true,
            bankName: true,
          },
        },
        creator: {
          include: {
            creatorProfile: true,
          },
        },
      },
    });

    if (!withdrawal) {
      throw new NotFoundException('Withdrawal not found');
    }

    const updateData: any = { status };

    if (notes) {
      updateData.notes = notes;
    }

    if (status === 'approved') {
      updateData.approvedAt = new Date();
    }

    // Process Stripe transfer when status is set to 'paid'
    if (status === 'paid') {
      const stripeAccountId =
        withdrawal.creator?.creatorProfile?.stripeAccountId;

      if (!stripeAccountId) {
        throw new BadRequestException(
          'Creator does not have a Stripe Connect account. Please complete Stripe onboarding first.',
        );
      }

      // Verify account is ready for transfers
      const isReady =
        await this.stripeService.isAccountReadyForTransfers(stripeAccountId);
      if (!isReady) {
        throw new BadRequestException(
          'Stripe Connect account is not ready to receive transfers. Please complete account verification.',
        );
      }

      // Verify that the bank account in our system matches the one in Stripe
      const stripeBankAccounts =
        await this.stripeService.listExternalBankAccounts(stripeAccountId);

      if (!stripeBankAccounts || stripeBankAccounts.length === 0) {
        throw new BadRequestException(
          'No bank account found in Stripe Connect. Please add a bank account through Stripe onboarding.',
        );
      }

      const withdrawalIban = withdrawal.bankAccount?.iban;
      if (withdrawalIban) {
        const normalizedIban = withdrawalIban.replace(/\s+/g, '').toUpperCase();
        const ibanLast4 = normalizedIban.slice(-4);

        const matchFound = stripeBankAccounts.some((stripeBankAcc) => {
          const stripeLast4 = stripeBankAcc.last4;
          return stripeLast4 === ibanLast4;
        });

        if (!matchFound) {
          throw new BadRequestException(
            `Bank account mismatch: the bank account on file (IBAN ending in ${ibanLast4}) does not match any bank account registered in Stripe Connect. ` +
            'Please ensure the same bank account is used in both the platform and Stripe.',
          );
        }
      }

      // Calculate transfer amount (using netStars after platform fee deduction)
      const amountInMinor = withdrawal.netStars * this.getStarValueInMinor();

      try {
        // Create Stripe transfer
        const transfer = await this.stripeService.createTransfer(
          amountInMinor,
          withdrawal.currency,
          stripeAccountId,
          {
            withdrawalId: withdrawal.id,
            creatorId: withdrawal.creatorId,
          },
        );

        updateData.stripeTransferId = transfer.id;
        updateData.amountInMinor = amountInMinor;
        updateData.paidAt = new Date();
      } catch (error) {
        throw new BadRequestException(
          `Stripe transfer failed: ${error.message}`,
        );
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

    return updatedWithdrawal as WithdrawalResponseDto;
  }

  /**
   * Admin: Get all withdrawals
   */
  async findAll(status?: WithdrawalStatus): Promise<WithdrawalResponseDto[]> {
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

    return withdrawals as unknown as WithdrawalResponseDto[];
  }

  async getPlatformNetProfit(
    from?: Date,
    to?: Date,
  ): Promise<PlatformNetProfitResponseDto> {
    if (from && to && from > to) {
      throw new BadRequestException('Invalid date range');
    }

    const where: Prisma.WithdrawalWhereInput = {
      paidAt: { not: null },
    };

    if (from || to) {
      where.paidAt = {
        not: null,
        ...(from ? { gte: from } : {}),
        ...(to ? { lte: to } : {}),
      };
    }

    const agg = await this.prismaService.withdrawal.aggregate({
      where,
      _sum: { platformFeeStars: true },
      _count: { _all: true },
    });

    const stars = agg._sum.platformFeeStars ?? 0;
    const amountInMinor = stars * this.getStarValueInMinor();

    return {
      from: from?.toISOString(),
      to: to?.toISOString(),
      currency: this.getCurrency(),
      paidWithdrawalsCount: agg._count._all,
      platformNetProfitStars: stars,
      platformNetProfitAmountInMinor: amountInMinor,
    };
  }
}
