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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawalController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const withdrawal_service_1 = require("./withdrawal.service");
const user_decorator_1 = require("../../utils/decorators/user.decorator");
const zod_validation_pipe_1 = require("../../pipes/zod-validation.pipe");
const withdrawal_validation_1 = require("./utils/withdrawal.validation");
const roles_decorator_1 = require("../../utils/decorators/roles.decorator");
const withdrawal_swagger_1 = require("./swagger/withdrawal.swagger");
let WithdrawalController = class WithdrawalController {
    withdrawalService;
    constructor(withdrawalService) {
        this.withdrawalService = withdrawalService;
    }
    getBalance(user) {
        return this.withdrawalService.getBalance(user.id);
    }
    createStripeConnect(user) {
        return this.withdrawalService.createStripeConnectAccount(user.id);
    }
    getStripeOnboardingLink(user) {
        return this.withdrawalService.getStripeOnboardingLink(user.id);
    }
    getStripeAccountStatus(user) {
        return this.withdrawalService.getStripeAccountStatus(user.id);
    }
    create(createWithdrawalDto, user) {
        return this.withdrawalService.create(createWithdrawalDto, user.id);
    }
    findAll(user) {
        return this.withdrawalService.findAllByUser(user.id);
    }
    findOne(id, user) {
        return this.withdrawalService.findOne(id, user.id);
    }
    cancel(id, user) {
        return this.withdrawalService.cancel(id, user.id);
    }
};
exports.WithdrawalController = WithdrawalController;
__decorate([
    (0, common_1.Get)('balance'),
    (0, roles_decorator_1.Roles)(['CAMPAIGN_CREATOR']),
    (0, swagger_1.ApiOperation)({
        summary: 'Get available balance',
        description: 'Retrieves the available balance for withdrawal including total donations received, total withdrawn, pending withdrawals, and available balance.',
    }),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.BalanceResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.UnauthorizedResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.ForbiddenResponse),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WithdrawalController.prototype, "getBalance", null);
__decorate([
    (0, common_1.Post)('stripe/connect'),
    (0, roles_decorator_1.Roles)(['CAMPAIGN_CREATOR']),
    (0, swagger_1.ApiOperation)({
        summary: 'Create Stripe Connect account',
        description: 'Creates a new Stripe Connect account for the campaign creator to receive withdrawals.',
    }),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.StripeConnectCreatedResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.UnauthorizedResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.ForbiddenResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.StripeAccountExistsResponse),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WithdrawalController.prototype, "createStripeConnect", null);
__decorate([
    (0, common_1.Get)('stripe/onboarding-link'),
    (0, roles_decorator_1.Roles)(['CAMPAIGN_CREATOR']),
    (0, swagger_1.ApiOperation)({
        summary: 'Get Stripe onboarding link',
        description: 'Retrieves the Stripe Connect onboarding link for the campaign creator to complete account setup.',
    }),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.StripeOnboardingLinkResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.UnauthorizedResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.ForbiddenResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.StripeAccountNotFoundResponse),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WithdrawalController.prototype, "getStripeOnboardingLink", null);
__decorate([
    (0, common_1.Get)('stripe/status'),
    (0, roles_decorator_1.Roles)(['CAMPAIGN_CREATOR']),
    (0, swagger_1.ApiOperation)({
        summary: 'Get Stripe account status',
        description: 'Retrieves the current status of the Stripe Connect account including verification status and capabilities.',
    }),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.StripeAccountStatusResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.UnauthorizedResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.ForbiddenResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.StripeAccountNotFoundResponse),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WithdrawalController.prototype, "getStripeAccountStatus", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(['CAMPAIGN_CREATOR']),
    (0, swagger_1.ApiOperation)({
        summary: 'Create withdrawal request',
        description: "Creates a new withdrawal request to transfer funds from the platform to the campaign creator's connected bank account or Stripe account.",
    }),
    (0, swagger_1.ApiBody)(withdrawal_swagger_1.CreateWithdrawalBody),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.WithdrawalCreatedResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.BadRequestResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.UnauthorizedResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.ForbiddenResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.InsufficientBalanceResponse),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(withdrawal_validation_1.withdrawalSchema))),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], WithdrawalController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(['CAMPAIGN_CREATOR']),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all withdrawals',
        description: 'Retrieves all withdrawal requests for the authenticated campaign creator.',
    }),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.WithdrawalListResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.UnauthorizedResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.ForbiddenResponse),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WithdrawalController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(['CAMPAIGN_CREATOR']),
    (0, swagger_1.ApiOperation)({
        summary: 'Get withdrawal by ID',
        description: 'Retrieves a specific withdrawal request by its ID.',
    }),
    (0, swagger_1.ApiParam)(withdrawal_swagger_1.WithdrawalIdParam),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.WithdrawalDetailResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.UnauthorizedResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.ForbiddenResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.WithdrawalNotFoundResponse),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WithdrawalController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(['CAMPAIGN_CREATOR']),
    (0, swagger_1.ApiOperation)({
        summary: 'Cancel withdrawal',
        description: 'Cancels a pending withdrawal request. Only withdrawals with PENDING status can be cancelled.',
    }),
    (0, swagger_1.ApiParam)(withdrawal_swagger_1.WithdrawalIdParam),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.WithdrawalCancelledResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.UnauthorizedResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.ForbiddenResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.WithdrawalNotFoundResponse),
    (0, swagger_1.ApiResponse)(withdrawal_swagger_1.WithdrawalCannotCancelResponse),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WithdrawalController.prototype, "cancel", null);
exports.WithdrawalController = WithdrawalController = __decorate([
    (0, swagger_1.ApiTags)('Withdrawal'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('withdrawal'),
    __metadata("design:paramtypes", [withdrawal_service_1.WithdrawalService])
], WithdrawalController);
//# sourceMappingURL=withdrawal.controller.js.map