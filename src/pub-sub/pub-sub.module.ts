import { Module } from '@nestjs/common';
import { SubscriberGateway } from './subscriber.gateway';
import { PublisherService } from './publisher.service';

@Module({
  providers: [SubscriberGateway, PublisherService],
})
export class PubSubModule {}
