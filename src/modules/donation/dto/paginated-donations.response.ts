import { ApiProperty } from '@nestjs/swagger';
import { DonationDto } from './donation.swagger.dto';

export class PaginatedDonationsResponse {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 57 })
  total: number;

  @ApiProperty({ example: 6 })
  totalPages: number;

  @ApiProperty({ type: [DonationDto] })
  items: DonationDto[];
}
