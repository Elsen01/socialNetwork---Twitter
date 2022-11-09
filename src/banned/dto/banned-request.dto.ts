import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBannedDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly banUserId: number;
}
