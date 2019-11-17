import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { ConfigModule } from '../config/config.module';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [ConfigModule, LoggerModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class UtilsModule {}
