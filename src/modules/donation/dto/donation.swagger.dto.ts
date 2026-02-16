import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '@prisma/client';

export class DonationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  campaignId: string;

  @ApiProperty()
  stars: number;

  @ApiProperty()
  starValueInMinor: number;

  @ApiProperty()
  amountInMinor: number;

  @ApiProperty()
  currency: string;

  @ApiProperty({ required: false, nullable: true })
  stripeCheckoutSessionId: string | null;

  @ApiProperty({ required: false, nullable: true })
  stripePaymentIntentId: string | null;

  @ApiProperty({ enum: PaymentStatus })
  paymentStatus: PaymentStatus;

  @ApiProperty({
    required: false,
    nullable: true,
    type: String,
    example: '2026-02-16T10:00:00.000Z',
  })
  paidAt: Date | null;

  @ApiProperty({ required: false, nullable: true })
  failureReason: string | null;

  @ApiProperty({ type: String, example: '2026-02-16T10:00:00.000Z' })
  createdAt: Date;
}
