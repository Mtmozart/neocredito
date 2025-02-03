/* eslint-disable @typescript-eslint/require-await */
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class RabbitMQConsumer {
  @EventPattern('evento_teste')
  async consumirEvento(@Payload() dados: any) {
    console.log('Mensagem recebida:', dados);
  }
}
