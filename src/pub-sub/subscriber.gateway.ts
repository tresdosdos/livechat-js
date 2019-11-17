import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { LoggerService } from '../logger/logger.service';
import { MessageDto } from '../utils/dto';
import { PublisherService } from './publisher.service';
import { IJwtGuardProps, JwtGuard } from './jwt.guard';
import { RoomDto } from '../utils/dto/room.dto';

@UseGuards(JwtGuard)
@WebSocketGateway()
export class SubscriberGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private logger: LoggerService,
    private publisherService: PublisherService,
  ) {}

  @SubscribeMessage('message')
  @UsePipes(new ValidationPipe({transform: true}))
  async handleMessage(
    @MessageBody() req: MessageDto & IJwtGuardProps,
    @ConnectedSocket() client: Socket,
  ) {
    const msg = await this.publisherService.saveMessage(req, req.user);

    this.server.emit('message', msg);
  }

  @SubscribeMessage('room/new')
  @UsePipes(new ValidationPipe({transform: true}))
  async createRoom(
    @MessageBody() req: RoomDto & IJwtGuardProps,
  ) {
    await this.publisherService.createRoom(req);
    const rooms = await this.publisherService.getRooms();

    this.server.emit('rooms', rooms);
  }

  @SubscribeMessage('room/join')
  async joinRoom(
    @MessageBody() req,
    @ConnectedSocket() client: Socket,
  ) {
    const messages = await this.publisherService.getMessages(req.id);

    client.emit(`room/${req.id}`, messages);
    this.server.emit(`room/${req.id}/joiners`, {
      user: req.user,
      id: req.user.id,
      roomId: req.id,
      text: 'joined this room',
    });
  }

  afterInit(server: Server) {
    this.logger.log('Web sockets started');
  }

  async handleConnection(client: Socket) {
    client.emit('rooms', await this.publisherService.getRooms());
  }
}
