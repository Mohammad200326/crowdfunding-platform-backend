import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DonationService } from './donation.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateDonationCheckoutDto } from './dto/create-donation-checkout.dto';
import { DonationCheckoutResponse } from './dto/donation-checkout.response';
import { User } from 'src/utils/decorators/user.decorator';
import { UserResponseDTO } from '../auth/dto/auth.dto';
import { DonationQueryDto } from './dto/donation-query.dto';
import { PaginatedDonationsResponse } from './dto/paginated-donations.response';
import { DonationDto } from './dto/donation.swagger.dto';

@ApiTags('Donation')
@ApiBearerAuth('access-token')
@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Get()
  @ApiOperation({ summary: 'Get all donations (paginated)' })
  @ApiOkResponse({ type: PaginatedDonationsResponse })
  getAll(@Query() query: DonationQueryDto) {
    return this.donationService.getAll(query);
  }

  @Get('campaign/:campaignId')
  @ApiOperation({ summary: 'Get donations by campaignId (paginated)' })
  @ApiParam({ name: 'campaignId', type: String })
  @ApiOkResponse({ type: PaginatedDonationsResponse })
  getByCampaignId(
    @Param('campaignId') campaignId: string,
    @Query() query: DonationQueryDto,
  ) {
    return this.donationService.getByCampaignId(campaignId, query);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get my donations (paginated)' })
  @ApiOkResponse({ type: PaginatedDonationsResponse })
  getMyDonations(
    @User() user: UserResponseDTO['userData'],
    @Query() query: DonationQueryDto,
  ) {
    return this.donationService.getByUserId(user.id, query);
  }

  @Post('checkout')
  @ApiOperation({ summary: 'Create Stripe checkout session for donation' })
  @ApiOkResponse({ type: DonationCheckoutResponse })
  createCheckout(
    @Body() dto: CreateDonationCheckoutDto,
    @User() user: UserResponseDTO['userData'],
  ) {
    return this.donationService.createCheckout(dto, user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get donation by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: DonationDto })
  getDonation(@Param('id') id: string) {
    return this.donationService.getById(id);
  }
}
