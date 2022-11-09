import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ResponseBannedDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly banUserId: number;
}
