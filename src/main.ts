import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        console.error(
          '\n ==> ValidationError',
          JSON.stringify(validationErrors),
          '\n',
        );
        return new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: JSON.stringify(validationErrors),
        });
      },
      whitelist: true,
      transform: true,
      dismissDefaultMessages: true,
      validationError: {
        target: false,
      },
    }),
  );

  const documentConfig = new DocumentBuilder()
    .setTitle('Demo')
    .setDescription('The Demo API description')
    .setVersion('1.0')
    .addTag('Demo')
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
  console.info(`Server running on port 3001`);
}
bootstrap();
