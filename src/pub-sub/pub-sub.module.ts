import { Module } from '@nestjs/common';
import { SubscriberGateway } from './subscriber.gateway';
import { PublisherService } from './publisher.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [SubscriberGateway, PublisherService],
})
export class PubSubModule {}
