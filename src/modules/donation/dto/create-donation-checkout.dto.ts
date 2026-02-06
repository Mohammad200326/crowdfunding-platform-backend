import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class CreateDonationCheckoutDto {
  @ApiProperty({ example: 'uuid-campaign-id' })
  @IsString()
  campaignId: string;

  @ApiProperty({ example: 3, minimum: 1, description: 'Stars count' })
  @IsInt()
  @Min(1)
  stars: number;
}
