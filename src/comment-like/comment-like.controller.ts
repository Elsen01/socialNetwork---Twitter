import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentLikeService } from './comment-like.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';
import { CreateCommentLikeDto } from './dto/create-comment-like.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('comments-like')
@Controller('comment-like')
export class CommentLikeController {
  constructor(private readonly commentLikeService: CommentLikeService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCommentLike(@User() user) {
    return await this.commentLikeService.getAllCommentLike(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async commentLike(@User() user, @Body() dto: CreateCommentLikeDto) {
    return await this.commentLikeService.creatCommentLike(dto, user.userId);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async unlikeComment(
    @User() user,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return await this.commentLikeService.unlikeCommentLike(user.userId, id);
  }
}
