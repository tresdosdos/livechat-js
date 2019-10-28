import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { Expose, plainToClass } from 'class-transformer';

@Injectable()
export class ConfigService {
  @Expose() public CLIENT_URL: string;

  public static create() {
    dotenv.config();

    return plainToClass(ConfigService, process.env, {strategy: 'excludeAll'});
  }
}
