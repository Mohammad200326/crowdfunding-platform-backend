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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
