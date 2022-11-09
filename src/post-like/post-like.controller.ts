import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostLikeService } from './post-like.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../auth/user.decorator';
import { CreatePostLikeDto } from './dto/create-post-like.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('post-like')
@Controller('post-like')
export class PostLikeController {
  constructor(private readonly postLikeService: PostLikeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async postLike(@User() user, @Body() dto: CreatePostLikeDto) {
    return await this.postLikeService.postLike(dto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async unlike(@User() user, @Param('id', new ParseIntPipe()) id: number) {
    return await this.postLikeService.postUnlike(id, user.userId);
  }
}
