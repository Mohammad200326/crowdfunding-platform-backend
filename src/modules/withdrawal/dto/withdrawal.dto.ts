import { Withdrawal } from '@prisma/client';

export type CreateWithdrawalDto = Pick<Withdrawal, 'starsNumber'> & {
  bankAccountId?: string;
};

export type WithdrawalResponseDto = Withdrawal & {
  bankAccount: {
    id: string;
    bankName: string;
    iban: string;
  };
};

export type WithdrawalBalanceDto = {
  totalDonationsReceived: number;
  totalWithdrawn: number;
  pendingWithdrawals: number;
  availableBalance: number;
  currency: string;
};

export type WithdrawalFeeBreakdown = {
  starsRequested: number;
  platformFeeRate: number;
  platformFeeStars: number;
  netStars: number;
  netAmountInMinor: number;
  currency: string;
};
