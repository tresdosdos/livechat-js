import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  public log(text: string) {
    console.log(text);
  }
}
