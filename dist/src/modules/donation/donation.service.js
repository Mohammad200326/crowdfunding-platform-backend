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
exports.DonationService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const stripe_service_1 = require("../stripe/stripe.service");
let DonationService = class DonationService {
    databaseService;
    stripeService;
    constructor(databaseService, stripeService) {
        this.databaseService = databaseService;
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
    async createCheckout(dto, userId) {
        const campaign = await this.databaseService.campaign.findUnique({
            where: { id: dto.campaignId },
            select: { id: true, isActive: true, isDeleted: true },
        });
        if (!campaign || campaign.isDeleted) {
            throw new common_1.NotFoundException('Campaign not found');
        }
        if (!campaign.isActive) {
            throw new common_1.BadRequestException('Campaign is not active');
        }
        const starValueInMinor = this.getStarValueInMinor();
        const currency = this.getCurrency();
        const amountInMinor = dto.stars * starValueInMinor;
        const donation = await this.databaseService.donation.create({
            data: {
                userId,
                campaignId: dto.campaignId,
                stars: dto.stars,
                starValueInMinor,
                amountInMinor,
                currency,
                paymentStatus: 'pending',
            },
            select: {
                id: true,
                amountInMinor: true,
                currency: true,
            },
        });
        const appUrl = process.env.APP_URL ?? 'http://localhost:3000';
        const session = await this.stripeService.stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: donation.currency,
                        product_data: {
                            name: `Donation to Campaign`,
                            metadata: { donationId: donation.id },
                        },
                        unit_amount: donation.amountInMinor,
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                donationId: donation.id,
                campaignId: dto.campaignId,
                userId,
                stars: String(dto.stars),
            },
            success_url: `${appUrl}/api/docs`,
            cancel_url: `${appUrl}/api/docs`,
        });
        await this.databaseService.donation.update({
            where: { id: donation.id },
            data: {
                stripeCheckoutSessionId: session.id,
            },
        });
        if (!session.url)
            throw new Error('Stripe session url is missing');
        return {
            donationId: donation.id,
            checkoutUrl: session.url,
        };
    }
    async getById(id) {
        const donation = await this.databaseService.donation.findUnique({
            where: { id },
            select: {
                id: true,
                stars: true,
                amountInMinor: true,
                currency: true,
                paymentStatus: true,
                paidAt: true,
                failureReason: true,
                stripeCheckoutSessionId: true,
                stripePaymentIntentId: true,
                createdAt: true,
            },
        });
        if (!donation)
            throw new common_1.NotFoundException('Donation not found');
        return donation;
    }
};
exports.DonationService = DonationService;
exports.DonationService = DonationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        stripe_service_1.StripeService])
], DonationService);
//# sourceMappingURL=donation.service.js.map