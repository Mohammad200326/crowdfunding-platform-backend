import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { StripeService } from '../stripe/stripe.service';
import { CreateDonationCheckoutDto } from './dto/create-donation-checkout.dto';

@Injectable()
export class DonationService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly stripeService: StripeService,
  ) {}

  private getStarValueInMinor() {
    const val = Number(process.env.STAR_VALUE_IN_MINOR ?? 500);
    if (!Number.isFinite(val) || val <= 0) {
      throw new Error('Invalid STAR_VALUE_IN_MINOR');
    }
    return val;
  }

  private getCurrency() {
    return (process.env.DEFAULT_CURRENCY ?? 'usd').toLowerCase();
  }

  async createCheckout(dto: CreateDonationCheckoutDto, userId: string) {
    const campaign = await this.databaseService.campaign.findUnique({
      where: { id: dto.campaignId },
      select: { id: true, isActive: true, isDeleted: true },
    });

    if (!campaign || campaign.isDeleted) {
      throw new NotFoundException('Campaign not found');
    }
    if (!campaign.isActive) {
      throw new BadRequestException('Campaign is not active');
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

    const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5173';

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
      success_url: `${frontendUrl}/donation/success?donationId=${donation.id}`,
      cancel_url: `${frontendUrl}/donation/cancel?donationId=${donation.id}`,
    });

    await this.databaseService.donation.update({
      where: { id: donation.id },
      data: {
        stripeCheckoutSessionId: session.id,
      },
    });

    if (!session.url) throw new Error('Stripe session url is missing');

    return {
      donationId: donation.id,
      checkoutUrl: session.url,
    };
  }

  async getById(id: string) {
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

    if (!donation) throw new NotFoundException('Donation not found');
    return donation;
  }
}
