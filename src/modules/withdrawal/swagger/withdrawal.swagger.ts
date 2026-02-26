import {
  ApiBodyOptions,
  ApiOperation,
  ApiParamOptions,
  ApiQuery,
  ApiResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';

export const WithdrawalIdParam: ApiParamOptions = {
  name: 'id',
  description: 'Withdrawal ID',
  type: 'string',
  example: 'withdrawal_123456',
};

export const CreateWithdrawalBody: ApiBodyOptions = {
  description: 'Withdrawal request data',
  schema: {
    type: 'object',
    required: ['starsNumber'],
    properties: {
      starsNumber: {
        type: 'number',
        description: 'Number of stars to withdraw',
        example: 100,
      },
      bankAccountId: {
        type: 'string',
        description: 'Optional bank account ID for withdrawal',
        example: 'bank_123456',
      },
    },
  },
};

export const BalanceResponse: ApiResponseOptions = {
  status: 200,
  description: 'Balance retrieved successfully',
  schema: {
    type: 'object',
    properties: {
      totalDonationsReceived: { type: 'number', example: 1000 },
      totalWithdrawn: { type: 'number', example: 500 },
      pendingWithdrawals: { type: 'number', example: 100 },
      availableBalance: { type: 'number', example: 400 },
      currency: { type: 'string', example: 'USD' },
    },
  },
};

export const StripeConnectCreatedResponse: ApiResponseOptions = {
  status: 201,
  description: 'Stripe Connect account created successfully',
  schema: {
    type: 'object',
    properties: {
      accountId: { type: 'string', example: 'acct_1234567890' },
      onboardingUrl: {
        type: 'string',
        example: 'https://connect.stripe.com/setup/...',
      },
    },
  },
};

export const StripeOnboardingLinkResponse: ApiResponseOptions = {
  status: 200,
  description: 'Onboarding link retrieved successfully',
  schema: {
    type: 'object',
    properties: {
      url: { type: 'string', example: 'https://connect.stripe.com/setup/...' },
      expiresAt: { type: 'number', example: 1699999999 },
    },
  },
};

export const StripeAccountStatusResponse: ApiResponseOptions = {
  status: 200,
  description: 'Account status retrieved successfully',
  schema: {
    type: 'object',
    properties: {
      accountId: { type: 'string', example: 'acct_1234567890' },
      chargesEnabled: { type: 'boolean', example: true },
      payoutsEnabled: { type: 'boolean', example: true },
      detailsSubmitted: { type: 'boolean', example: true },
      requirements: {
        type: 'object',
        properties: {
          currentlyDue: { type: 'array', items: { type: 'string' } },
          eventuallyDue: { type: 'array', items: { type: 'string' } },
          pendingVerification: { type: 'array', items: { type: 'string' } },
        },
      },
    },
  },
};

export const WithdrawalCreatedResponse: ApiResponseOptions = {
  status: 201,
  description: 'Withdrawal request created successfully',
  schema: {
    type: 'object',
    properties: {
      id: { type: 'string', example: 'withdrawal_123456' },
      starsNumber: { type: 'number', example: 100 },
      status: { type: 'string', example: 'PENDING' },
      platformFee: { type: 'number', example: 5 },
      netAmount: { type: 'number', example: 95 },
      createdAt: { type: 'string', format: 'date-time' },
    },
  },
};

export const WithdrawalListResponse: ApiResponseOptions = {
  status: 200,
  description: 'List of withdrawals retrieved successfully',
  schema: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'withdrawal_123456' },
        starsNumber: { type: 'number', example: 100 },
        status: {
          type: 'string',
          enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED', 'FAILED'],
        },
        platformFee: { type: 'number', example: 5 },
        netAmount: { type: 'number', example: 95 },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        bankAccount: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            bankName: { type: 'string' },
            iban: { type: 'string' },
          },
        },
      },
    },
  },
};

export const WithdrawalDetailResponse: ApiResponseOptions = {
  status: 200,
  description: 'Withdrawal retrieved successfully',
  schema: {
    type: 'object',
    properties: {
      id: { type: 'string', example: 'withdrawal_123456' },
      starsNumber: { type: 'number', example: 100 },
      status: {
        type: 'string',
        enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED', 'FAILED'],
      },
      platformFee: { type: 'number', example: 5 },
      netAmount: { type: 'number', example: 95 },
      stripeTransferId: { type: 'string', example: 'tr_123456' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
      bankAccount: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          bankName: { type: 'string' },
          iban: { type: 'string' },
        },
      },
    },
  },
};

export const WithdrawalCancelledResponse: ApiResponseOptions = {
  status: 200,
  description: 'Withdrawal cancelled successfully',
  schema: {
    type: 'object',
    properties: {
      id: { type: 'string', example: 'withdrawal_123456' },
      status: { type: 'string', example: 'CANCELLED' },
      message: { type: 'string', example: 'Withdrawal cancelled successfully' },
    },
  },
};

export const UnauthorizedResponse: ApiResponseOptions = {
  status: 401,
  description: 'Unauthorized',
};

export const ForbiddenResponse: ApiResponseOptions = {
  status: 403,
  description: 'Forbidden - Campaign Creator role required',
};

export const NotFoundResponse: ApiResponseOptions = {
  status: 404,
  description: 'Resource not found',
};

export const StripeAccountNotFoundResponse: ApiResponseOptions = {
  status: 404,
  description: 'Stripe Connect account not found',
};

export const WithdrawalNotFoundResponse: ApiResponseOptions = {
  status: 404,
  description: 'Withdrawal not found',
};

export const StripeAccountExistsResponse: ApiResponseOptions = {
  status: 409,
  description: 'Stripe Connect account already exists',
};

export const WithdrawalCannotCancelResponse: ApiResponseOptions = {
  status: 409,
  description: 'Withdrawal cannot be cancelled - not in PENDING status',
};

export const BadRequestResponse: ApiResponseOptions = {
  status: 400,
  description: 'Bad Request - Invalid input data',
};

export const InsufficientBalanceResponse: ApiResponseOptions = {
  status: 422,
  description: 'Insufficient balance for withdrawal',
};

export const UpdateWithdrawalStatusBody: ApiBodyOptions = {
  description: 'Update withdrawal status',
  schema: {
    type: 'object',
    required: ['status'],
    properties: {
      status: {
        type: 'string',
        enum: ['pending', 'approved', 'paid', 'rejected'],
        description: 'New status for the withdrawal',
        example: 'approved',
      },
      notes: {
        type: 'string',
        description: 'Optional notes about the status change',
        example: 'Approved by admin',
      },
    },
  },
};

export const WithdrawalStatusUpdatedResponse: ApiResponseOptions = {
  status: 200,
  description: 'Withdrawal status updated successfully',
  schema: {
    type: 'object',
    properties: {
      id: { type: 'string', example: 'withdrawal_123456' },
      starsNumber: { type: 'number', example: 100 },
      status: { type: 'string', example: 'approved' },
      notes: { type: 'string', example: 'Approved by admin' },
      approvedAt: { type: 'string', format: 'date-time' },
      bankAccount: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          bankName: { type: 'string' },
          iban: { type: 'string' },
        },
      },
    },
  },
};

export const PlatformNetProfitOperation = ApiOperation({
  summary: 'Get platform net profit',
  description:
    'Returns platform net profit based on PAID withdrawals only (sum of platformFeeStars). Optional date range filters by paidAt.',
});

export const PlatformNetProfitFromQuery = ApiQuery({
  name: 'from',
  required: false,
  type: String,
  example: '2026-02-01',
  description: 'Start date (inclusive). Filter is applied on paidAt.',
});

export const PlatformNetProfitToQuery = ApiQuery({
  name: 'to',
  required: false,
  type: String,
  example: '2026-02-29',
  description: 'End date (inclusive). Filter is applied on paidAt.',
});

export const PlatformNetProfitResponse = ApiResponse({
  status: 200,
  description: 'Platform net profit returned successfully.',
  schema: {
    example: {
      from: '2026-02-01T00:00:00.000Z',
      to: '2026-02-29T23:59:59.999Z',
      currency: 'usd',
      paidWithdrawalsCount: 12,
      platformNetProfitStars: 340,
      platformNetProfitAmountInMinor: 170000,
    },
  },
});
