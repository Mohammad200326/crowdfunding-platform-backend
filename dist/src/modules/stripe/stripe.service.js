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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = __importDefault(require("stripe"));
let StripeService = class StripeService {
    stripe;
    constructor() {
        const key = process.env.STRIPE_SECRET_KEY;
        if (!key)
            throw new Error('STRIPE_SECRET_KEY is missing');
        this.stripe = new stripe_1.default(key, {
            apiVersion: '2026-01-28.clover',
        });
    }
    async createConnectAccount(email, metadata) {
        return this.stripe.accounts.create({
            type: 'express',
            email,
            metadata,
            capabilities: {
                transfers: { requested: true },
            },
        });
    }
    async createAccountLink(accountId, refreshUrl, returnUrl) {
        return this.stripe.accountLinks.create({
            account: accountId,
            refresh_url: refreshUrl,
            return_url: returnUrl,
            type: 'account_onboarding',
        });
    }
    async getConnectAccount(accountId) {
        return this.stripe.accounts.retrieve(accountId);
    }
    async isAccountReadyForTransfers(accountId) {
        const account = await this.stripe.accounts.retrieve(accountId);
        return (account.charges_enabled === true &&
            account.payouts_enabled === true &&
            account.details_submitted === true);
    }
    async createTransfer(amountInMinor, currency, destinationAccountId, metadata) {
        return this.stripe.transfers.create({
            amount: amountInMinor,
            currency,
            destination: destinationAccountId,
            metadata,
        });
    }
    async getTransfer(transferId) {
        return this.stripe.transfers.retrieve(transferId);
    }
    async getPlatformBalance() {
        return this.stripe.balance.retrieve();
    }
};
exports.StripeService = StripeService;
exports.StripeService = StripeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StripeService);
//# sourceMappingURL=stripe.service.js.map