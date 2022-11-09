import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty()
  @IsOptional()
  body: string;
}
