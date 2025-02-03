import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  // eslint-disable-next-line @typescript-eslint/require-await
  async enviarMensagem(padrao: string, dados: any) {
    return this.client.emit(padrao, dados);
  }
}
