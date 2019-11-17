import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriberGateway } from './subscriber.gateway';
import { PublisherService } from './publisher.service';
import { LoggerModule } from '../logger/logger.module';
import { MessageEntity, RoomEntity } from '../db/models';
import { UtilsModule } from '../utils/utils.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([MessageEntity, RoomEntity]), UtilsModule, UserModule],
  providers: [SubscriberGateway, PublisherService],
})
export class PubSubModule {}
