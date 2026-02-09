import {
  ApiBodyOptions,
  ApiParamOptions,
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
