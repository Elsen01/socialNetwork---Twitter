import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateImageDto {
  @ApiProperty()
  @IsOptional()
  readonly title: string;

  @ApiProperty()
  @IsOptional()
  readonly content: string;
}
