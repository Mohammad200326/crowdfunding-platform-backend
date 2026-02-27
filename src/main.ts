import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('CURRENT DB URL:', process.env.DATABASE_URL);
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.enableCors();

  app.use('/api/v1/webhooks/stripe', express.raw({ type: 'application/json' }));

  app.use(express.json());

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Crowdfunding API')
    .setDescription('API documentation for Crowdfunding Platform')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error('Failed to bootstrap the application', err);
  process.exit(1);
});
