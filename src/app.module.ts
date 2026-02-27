import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import path from 'path';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { FileModule } from './modules/file/file.module';
import { DonorModule } from './modules/donor/donor.module';
import { CampaignCreatorModule } from './modules/campaign-creator/campaign-creator.module';
import { UserModule } from './modules/user/user.module';
import { CampaignModule } from './modules/campaign/campaign.module';
import { CampaignUpdateModule } from './modules/campaign-update/campaign-update.module';
import { BankAccountModule } from './modules/bank-account/bank-account.module';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { DonorIdentityModule } from './modules/donor-identity/donor-identity.module';
import { CreatorIdentityModule } from './modules/creator-identity/creator-identity.module';
import { WithdrawalModule } from './modules/withdrawal/withdrawal.module';
import { DonationModule } from './modules/donation/donation.module';

// const envFilePath = path.join(
//   __dirname,
//   `../.env.${process.env.NODE_ENV === 'development' ? 'dev' : 'prod'}`,
// );

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    DatabaseModule,
    FileModule,
    DonorModule,
    CampaignCreatorModule,
    UserModule,
    CampaignModule,
    CampaignUpdateModule,
    BankAccountModule,
    DonorIdentityModule,
    CreatorIdentityModule,
    DonationModule,
    WithdrawalModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
