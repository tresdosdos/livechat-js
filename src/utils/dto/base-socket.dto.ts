import { IsDefined, IsString, ValidateNested } from 'class-validator';

export class BaseSocketDto<T = object > {
  @IsString()
  token: string;

  @ValidateNested()
  @IsDefined()
  data: T;
}
