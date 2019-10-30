import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { LoggerService } from '../logger/logger.service';
import { BaseSocketDto } from '../utils/dto';

@WebSocketGateway()
export class SubscriberGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private logger: LoggerService) {}

  @SubscribeMessage('message')
  @UsePipes(new ValidationPipe({transform: true}))
  handleMessage(
    @MessageBody() data: BaseSocketDto<{message: string}>,
    @ConnectedSocket() client: Socket,
  ): BaseSocketDto {
    console.log(data);

    return data;
  }

  afterInit(server: Server) {
    this.logger.log('Web sockets started');
  }
}
