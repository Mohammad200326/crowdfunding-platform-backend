import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DonationService } from './donation.service';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { CreateDonationCheckoutDto } from './dto/create-donation-checkout.dto';
import { DonationCheckoutResponse } from './dto/donation-checkout.response';
import { User } from 'src/utils/decorators/user.decorator';
import { UserResponseDTO } from '../auth/dto/auth.dto';

@ApiBearerAuth('access-token')
@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post('checkout')
  @ApiOkResponse({ type: DonationCheckoutResponse })
  createCheckout(
    @Body() dto: CreateDonationCheckoutDto,
    @User() user: UserResponseDTO['userData'],
  ) {
    return this.donationService.createCheckout(dto, user.id);
  }

  @Get(':id')
  getDonation(@Param('id') id: string) {
    return this.donationService.getById(id);
  }
}
