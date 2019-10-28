import { IsString } from 'class-validator';

export class MessageDto {
  @IsString()
  public message: string;
}
