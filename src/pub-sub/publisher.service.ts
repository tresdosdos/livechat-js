import { Injectable } from '@nestjs/common';
import { BaseSocketDto } from '../utils/dto';

@Injectable()
export class PublisherService {
  private buildData<T>(data: T, token: string): BaseSocketDto<T> {
    return {
      token,
      data,
    };
  }
}
