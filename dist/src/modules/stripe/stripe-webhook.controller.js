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
exports.StripeWebhookController = void 0;
const common_1 = require("@nestjs/common");
const stripe_service_1 = require("./stripe.service");
const database_service_1 = require("../database/database.service");
let StripeWebhookController = class StripeWebhookController {
    stripeService;
    databaseService;
    constructor(stripeService, databaseService) {
        this.stripeService = stripeService;
        this.databaseService = databaseService;
    }
    async handleStripeWebhook(req, signature) {
        console.log('Stripe webhook hit ✅');
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!webhookSecret)
            throw new Error('STRIPE_WEBHOOK_SECRET is missing');
        const event = this.stripeService.stripe.webhooks.constructEvent(req.rawBody, signature, webhookSecret);
        console.log('Stripe event type:', event.type, 'id:', event.id);
        const already = await this.databaseService.stripeEvent.findUnique({
            where: { id: event.id },
            select: { id: true },
        });
        if (already)
            return { received: true, duplicate: true };
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const donationId = session.metadata?.donationId;
            await this.databaseService.$transaction(async (tx) => {
                await tx.stripeEvent.create({
                    data: {
                        id: event.id,
                        type: event.type,
                        donationId: donationId ?? null,
                    },
                });
                if (donationId) {
                    await tx.donation.update({
                        where: { id: donationId },
                        data: {
                            paymentStatus: 'completed',
                            paidAt: new Date(),
                            stripePaymentIntentId: typeof session.payment_intent === 'string'
                                ? session.payment_intent
                                : null,
                            failureReason: null,
                        },
                    });
                }
            });
            return { received: true };
        }
        await this.databaseService.stripeEvent.create({
            data: { id: event.id, type: event.type },
        });
        return { received: true };
    }
};
exports.StripeWebhookController = StripeWebhookController;
__decorate([
    (0, common_1.Post)('stripe'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)('stripe-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], StripeWebhookController.prototype, "handleStripeWebhook", null);
exports.StripeWebhookController = StripeWebhookController = __decorate([
    (0, common_1.Controller)('webhooks'),
    __metadata("design:paramtypes", [stripe_service_1.StripeService,
        database_service_1.DatabaseService])
], StripeWebhookController);
//# sourceMappingURL=stripe-webhook.controller.js.map