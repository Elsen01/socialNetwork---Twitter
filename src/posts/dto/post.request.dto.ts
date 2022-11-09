import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsOptional()
  readonly title: string;

  @ApiProperty()
  @IsOptional()
  readonly content: string;

  @ApiPropertyOptional({ format: 'binary', type: 'string' })
  @IsOptional()
  readonly postUrl: string;
}

export class UpdatePostDto {
  @ApiProperty()
  @IsOptional()
  readonly title: string;

  @ApiProperty()
  @IsOptional()
  readonly content: string;

  @ApiPropertyOptional({ format: 'binary', type: 'string' })
  @IsOptional()
  readonly postUrl: string;
}
