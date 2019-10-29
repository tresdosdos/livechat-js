import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDto } from '../utils/dto/message.dto';
import { LoggerService } from '../logger/logger.service';

@WebSocketGateway()
export class SubscriberGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private logger: LoggerService) {}

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: MessageDto,
    @ConnectedSocket() client: Socket,
  ): string {
    console.log(data);

    return 'Hello world!';
  }

  afterInit(server: Server) {
    this.logger.log('Web sockets started');
  }
}
