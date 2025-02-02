import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from './config/validation.config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Neo Crédito')
  .setVersion('1.0')
  .addTag('user')
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  appConfig(app);
  await app.listen(process.env.PORT ?? 8000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
