import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import path from 'path';
import { ConfigModule } from '@nestjs/config';

const envFilePath = path.join(
  __dirname,
  `../.env.${process.env.NODE_ENV === 'development' ? 'dev' : 'prod'}`,
);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
