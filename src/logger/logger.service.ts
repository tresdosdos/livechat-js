import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  public log(text: string) {
    Logger.log(text);
  }
}
