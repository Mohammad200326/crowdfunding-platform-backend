import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { WithdrawalService } from './withdrawal.service';
import type {
  CreateWithdrawalDto,
  UpdateWithdrawalStatusDto,
} from './dto/withdrawal.dto';
import { User } from 'src/utils/decorators/user.decorator';
import { UserResponseDTO } from '../auth/dto/auth.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { withdrawalSchema } from './utils/withdrawal.validation';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from 'src/utils/decorators/roles.decorator';
import {
  WithdrawalIdParam,
  CreateWithdrawalBody,
  BalanceResponse,
  StripeConnectCreatedResponse,
  StripeOnboardingLinkResponse,
  StripeAccountStatusResponse,
  WithdrawalCreatedResponse,
  WithdrawalListResponse,
  WithdrawalDetailResponse,
  WithdrawalCancelledResponse,
  UnauthorizedResponse,
  ForbiddenResponse,
  StripeAccountNotFoundResponse,
  StripeAccountExistsResponse,
  WithdrawalNotFoundResponse,
  WithdrawalCannotCancelResponse,
  BadRequestResponse,
  InsufficientBalanceResponse,
  UpdateWithdrawalStatusBody,
  WithdrawalStatusUpdatedResponse,
} from './swagger/withdrawal.swagger';

@ApiTags('Withdrawal')
@ApiBearerAuth('access-token')
@Controller('withdrawal')
export class WithdrawalController {
  constructor(private readonly withdrawalService: WithdrawalService) {}

  /**
   * Get available balance for withdrawal
   */
  @Get('balance')
  @Roles(['CAMPAIGN_CREATOR'])
  @ApiOperation({
    summary: 'Get available balance',
    description:
      'Retrieves the available balance for withdrawal including total donations received, total withdrawn, pending withdrawals, and available balance.',
  })
  @ApiResponse(BalanceResponse)
  @ApiResponse(UnauthorizedResponse)
  @ApiResponse(ForbiddenResponse)
  getBalance(@User() user: UserResponseDTO['userData']) {
    return this.withdrawalService.getBalance(user.id);
  }

  /**
   * Create Stripe Connect account for campaign creator
   */
  @Post('stripe/connect')
  @Roles(['CAMPAIGN_CREATOR'])
  @ApiOperation({
    summary: 'Create Stripe Connect account',
    description:
      'Creates a new Stripe Connect account for the campaign creator to receive withdrawals.',
  })
  @ApiResponse(StripeConnectCreatedResponse)
  @ApiResponse(UnauthorizedResponse)
  @ApiResponse(ForbiddenResponse)
  @ApiResponse(StripeAccountExistsResponse)
  createStripeConnect(@User() user: UserResponseDTO['userData']) {
    return this.withdrawalService.createStripeConnectAccount(user.id);
  }

  /**
   * Get Stripe Connect onboarding link
   */
  // @Get('stripe/onboarding-link')
  // @Roles(['CAMPAIGN_CREATOR'])
  // @ApiOperation({
  //   summary: 'Get Stripe onboarding link',
  //   description:
  //     'Retrieves the Stripe Connect onboarding link for the campaign creator to complete account setup.',
  // })
  // @ApiResponse(StripeOnboardingLinkResponse)
  // @ApiResponse(UnauthorizedResponse)
  // @ApiResponse(ForbiddenResponse)
  // @ApiResponse(StripeAccountNotFoundResponse)
  // getStripeOnboardingLink(@User() user: UserResponseDTO['userData']) {
  //   return this.withdrawalService.getStripeOnboardingLink(user.id);
  // }

  /**
   * Get Stripe Connect account status
   */
  @Get('stripe/status')
  @Roles(['CAMPAIGN_CREATOR'])
  @ApiOperation({
    summary: 'Get Stripe account status',
    description:
      'Retrieves the current status of the Stripe Connect account including verification status and capabilities.',
  })
  @ApiResponse(StripeAccountStatusResponse)
  @ApiResponse(UnauthorizedResponse)
  @ApiResponse(ForbiddenResponse)
  @ApiResponse(StripeAccountNotFoundResponse)
  getStripeAccountStatus(@User() user: UserResponseDTO['userData']) {
    return this.withdrawalService.getStripeAccountStatus(user.id);
  }

  /**
   * Create a new withdrawal request
   */
  @Post()
  @Roles(['CAMPAIGN_CREATOR'])
  @ApiOperation({
    summary: 'Create withdrawal request',
    description:
      "Creates a new withdrawal request to transfer funds from the platform to the campaign creator's connected bank account or Stripe account.",
  })
  @ApiBody(CreateWithdrawalBody)
  @ApiResponse(WithdrawalCreatedResponse)
  @ApiResponse(BadRequestResponse)
  @ApiResponse(UnauthorizedResponse)
  @ApiResponse(ForbiddenResponse)
  @ApiResponse(InsufficientBalanceResponse)
  create(
    @Body(new ZodValidationPipe(withdrawalSchema))
    createWithdrawalDto: CreateWithdrawalDto,
    @User() user: UserResponseDTO['userData'],
  ) {
    return this.withdrawalService.create(createWithdrawalDto, user.id);
  }

  /**
   * Get all withdrawals (Admin)
   */
  @Get('all')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get all withdrawals from all creators',
    description:
      'Retrieves all withdrawal requests from all campaign creators. This is typically an admin endpoint.',
  })
  @ApiResponse(WithdrawalListResponse)
  @ApiResponse(UnauthorizedResponse)
  findAllWithdrawals() {
    return this.withdrawalService.findAll();
  }

  /**
   * Get withdrawals for a specific creator by creator ID
   */
  @Get('creator/:creatorId')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get withdrawals for a specific creator',
    description:
      'Retrieves all withdrawal requests for a specific campaign creator by their ID.',
  })
  @ApiParam({
    name: 'creatorId',
    description: 'Campaign Creator ID',
    type: 'string',
    example: 'creator_123456',
  })
  @ApiResponse(WithdrawalListResponse)
  @ApiResponse(UnauthorizedResponse)
  findByCreator(@Param('creatorId') creatorId: string) {
    return this.withdrawalService.findAllByUser(creatorId);
  }

  /**
   * Get all withdrawals for the authenticated user
   */
  @Get()
  @Roles(['CAMPAIGN_CREATOR'])
  @ApiOperation({
    summary: 'Get my withdrawals',
    description:
      'Retrieves all withdrawal requests for the authenticated campaign creator.',
  })
  @ApiResponse(WithdrawalListResponse)
  @ApiResponse(UnauthorizedResponse)
  @ApiResponse(ForbiddenResponse)
  findAll(@User() user: UserResponseDTO['userData']) {
    return this.withdrawalService.findAllByUser(user.id);
  }

  /**
   * Get a specific withdrawal by ID
   */
  @Get(':id')
  @Roles(['CAMPAIGN_CREATOR'])
  @ApiOperation({
    summary: 'Get withdrawal by ID',
    description: 'Retrieves a specific withdrawal request by its ID.',
  })
  @ApiParam(WithdrawalIdParam)
  @ApiResponse(WithdrawalDetailResponse)
  @ApiResponse(UnauthorizedResponse)
  @ApiResponse(ForbiddenResponse)
  @ApiResponse(WithdrawalNotFoundResponse)
  findOne(@Param('id') id: string, @User() user: UserResponseDTO['userData']) {
    return this.withdrawalService.findOne(id, user.id);
  }

  /**
   * Update withdrawal status (Admin/Approval)
   */
  @Patch(':id/status')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update withdrawal status',
    description:
      'Updates the status of a withdrawal request. Can change from pending to approved, approved to paid, or any status to rejected.',
  })
  @ApiParam(WithdrawalIdParam)
  @ApiBody(UpdateWithdrawalStatusBody)
  @ApiResponse(WithdrawalStatusUpdatedResponse)
  @ApiResponse(BadRequestResponse)
  @ApiResponse(UnauthorizedResponse)
  @ApiResponse(WithdrawalNotFoundResponse)
  updateStatus(
    @Param('id') id: string,
    @Body() updateDto: UpdateWithdrawalStatusDto,
  ) {
    return this.withdrawalService.updateStatus(
      id,
      updateDto.status,
      updateDto.notes,
    );
  }

  /**
   * Cancel a pending withdrawal
   */
  @Delete(':id')
  @Roles(['CAMPAIGN_CREATOR'])
  @ApiOperation({
    summary: 'Cancel withdrawal',
    description:
      'Cancels a pending withdrawal request. Only withdrawals with PENDING status can be cancelled.',
  })
  @ApiParam(WithdrawalIdParam)
  @ApiResponse(WithdrawalCancelledResponse)
  @ApiResponse(UnauthorizedResponse)
  @ApiResponse(ForbiddenResponse)
  @ApiResponse(WithdrawalNotFoundResponse)
  @ApiResponse(WithdrawalCannotCancelResponse)
  cancel(@Param('id') id: string, @User() user: UserResponseDTO['userData']) {
    return this.withdrawalService.cancel(id, user.id);
  }
}
