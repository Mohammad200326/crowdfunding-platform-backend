import { ApiProperty } from '@nestjs/swagger';

export class DonationCheckoutResponse {
  @ApiProperty()
  donationId: string;

  @ApiProperty({ description: 'Stripe Checkout URL' })
  checkoutUrl: string;
}
