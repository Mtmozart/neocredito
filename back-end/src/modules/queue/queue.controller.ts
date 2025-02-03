import { Controller, Post, Body } from '@nestjs/common';
import { RabbitMQService } from './queue.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('RabbitMQ')
@Controller('micro')
export class QueueController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Post('enviar')
  async enviar(@Body() dados: any) {
    await this.rabbitMQService.enviarMensagem('evento_teste', dados);
    return { message: 'Mensagem enviada!' };
  }
}
