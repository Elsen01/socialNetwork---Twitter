import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly body: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly messSenderId: number;
}
