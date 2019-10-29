import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DbModule } from './db/db.module';
import { LoggerModule } from './logger/logger.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { UserModule } from './user/user.module';
import { PubSubModule } from './pub-sub/pub-sub.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [ConfigModule, DbModule, LoggerModule, MiddlewareModule, UserModule, PubSubModule, UtilsModule],
})
export class AppModule {}
