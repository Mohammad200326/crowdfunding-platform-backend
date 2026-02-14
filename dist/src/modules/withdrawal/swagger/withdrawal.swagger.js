"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
exports.WithdrawalStatusUpdatedResponse = exports.UpdateWithdrawalStatusBody = exports.InsufficientBalanceResponse = exports.BadRequestResponse = exports.WithdrawalCannotCancelResponse = exports.StripeAccountExistsResponse = exports.WithdrawalNotFoundResponse = exports.StripeAccountNotFoundResponse = exports.NotFoundResponse = exports.ForbiddenResponse = exports.UnauthorizedResponse = exports.WithdrawalCancelledResponse = exports.WithdrawalDetailResponse = exports.WithdrawalListResponse = exports.WithdrawalCreatedResponse = exports.StripeAccountStatusResponse = exports.StripeOnboardingLinkResponse = exports.StripeConnectCreatedResponse = exports.BalanceResponse = exports.CreateWithdrawalBody = exports.WithdrawalIdParam = void 0;
=======
exports.InsufficientBalanceResponse = exports.BadRequestResponse = exports.WithdrawalCannotCancelResponse = exports.StripeAccountExistsResponse = exports.WithdrawalNotFoundResponse = exports.StripeAccountNotFoundResponse = exports.NotFoundResponse = exports.ForbiddenResponse = exports.UnauthorizedResponse = exports.WithdrawalCancelledResponse = exports.WithdrawalDetailResponse = exports.WithdrawalListResponse = exports.WithdrawalCreatedResponse = exports.StripeAccountStatusResponse = exports.StripeOnboardingLinkResponse = exports.StripeConnectCreatedResponse = exports.BalanceResponse = exports.CreateWithdrawalBody = exports.WithdrawalIdParam = void 0;
>>>>>>> develop
exports.WithdrawalIdParam = {
    name: 'id',
    description: 'Withdrawal ID',
    type: 'string',
    example: 'withdrawal_123456',
};
exports.CreateWithdrawalBody = {
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
exports.BalanceResponse = {
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
exports.StripeConnectCreatedResponse = {
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
exports.StripeOnboardingLinkResponse = {
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
exports.StripeAccountStatusResponse = {
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
exports.WithdrawalCreatedResponse = {
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
exports.WithdrawalListResponse = {
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
exports.WithdrawalDetailResponse = {
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
exports.WithdrawalCancelledResponse = {
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
exports.UnauthorizedResponse = {
    status: 401,
    description: 'Unauthorized',
};
exports.ForbiddenResponse = {
    status: 403,
    description: 'Forbidden - Campaign Creator role required',
};
exports.NotFoundResponse = {
    status: 404,
    description: 'Resource not found',
};
exports.StripeAccountNotFoundResponse = {
    status: 404,
    description: 'Stripe Connect account not found',
};
exports.WithdrawalNotFoundResponse = {
    status: 404,
    description: 'Withdrawal not found',
};
exports.StripeAccountExistsResponse = {
    status: 409,
    description: 'Stripe Connect account already exists',
};
exports.WithdrawalCannotCancelResponse = {
    status: 409,
    description: 'Withdrawal cannot be cancelled - not in PENDING status',
};
exports.BadRequestResponse = {
    status: 400,
    description: 'Bad Request - Invalid input data',
};
exports.InsufficientBalanceResponse = {
    status: 422,
    description: 'Insufficient balance for withdrawal',
};
<<<<<<< HEAD
exports.UpdateWithdrawalStatusBody = {
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
exports.WithdrawalStatusUpdatedResponse = {
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
=======
>>>>>>> develop
//# sourceMappingURL=withdrawal.swagger.js.map