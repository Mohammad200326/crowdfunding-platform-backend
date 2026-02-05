import { Controller, Headers, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { StripeService } from './stripe.service';
import { DatabaseService } from '../database/database.service';

type StripeRawBodyRequest = Request & { rawBody: Buffer };

@Controller('webhooks')
export class StripeWebhookController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Post('stripe')
  async handleStripeWebhook(
    @Req() req: StripeRawBodyRequest,
    @Headers('stripe-signature') signature: string,
  ) {
    console.log('Stripe webhook hit ✅');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) throw new Error('STRIPE_WEBHOOK_SECRET is missing');

    const event = this.stripeService.stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      webhookSecret,
    );
    console.log('Stripe event type:', event.type, 'id:', event.id);

    const already = await this.databaseService.stripeEvent.findUnique({
      where: { id: event.id },
      select: { id: true },
    });
    if (already) return { received: true, duplicate: true };

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
              stripePaymentIntentId:
                typeof session.payment_intent === 'string'
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
}
