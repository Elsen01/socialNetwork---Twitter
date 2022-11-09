import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateShareDto {
  @ApiProperty()
  @IsNotEmpty()
  sharedUserId: number;
}
