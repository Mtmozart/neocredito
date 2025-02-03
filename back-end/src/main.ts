import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from './config/validation.config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Neo Crédito')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .addTag('User')
    .addTag('Auth')
    .addTag('RabbitMQ')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  appConfig(app);

  // Conecta o microserviço ao mesmo app HTTP
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: 'minha_fila',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices(); // Inicia os microsserviços
  await app.listen(process.env.PORT ?? 8000); // Inicia o servidor HTTP
}

bootstrap();
