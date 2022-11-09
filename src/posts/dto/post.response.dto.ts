import { ApiProperty } from '@nestjs/swagger';

export class ResponsePostDto {
  @ApiProperty()
  readonly content: string;

  @ApiProperty()
  readonly title: string;
}
