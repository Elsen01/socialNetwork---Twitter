import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostLikeDto {
  @ApiProperty()
  @IsNotEmpty()
  postId: number;
}
