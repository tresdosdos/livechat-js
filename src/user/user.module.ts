import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../db/models';
import { UtilsModule } from '../utils/utils.module';
import { JwtMiddleware } from './jwt.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UtilsModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware)
      .forRoutes({path: '/user', method: RequestMethod.GET});
  }
}
