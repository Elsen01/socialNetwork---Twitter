import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateImageDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}
