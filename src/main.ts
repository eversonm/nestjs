import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LogInterceptor } from './interceptors/log.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // for all controllers
  // app.useGlobalInterceptors(new LogInterceptor());

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Users API Rest')
    .setDescription('CRUD for users')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
