import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFriendshipListDto {
  @ApiProperty()
  @IsNotEmpty()
  sendUserId: number;
}
