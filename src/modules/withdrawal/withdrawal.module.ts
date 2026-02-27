import { Module } from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { WithdrawalController } from './withdrawal.controller';
import { DatabaseModule } from '../database/database.module';
import { StripeModule } from '../stripe/stripe.module';

@Module({
  imports: [DatabaseModule, StripeModule],
  controllers: [WithdrawalController],
  providers: [WithdrawalService],
  exports: [WithdrawalService],
})
export class WithdrawalModule {}
