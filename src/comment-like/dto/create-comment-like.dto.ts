import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentLikeDto {
  @ApiProperty()
  @IsNotEmpty()
  commentId: number;
}
