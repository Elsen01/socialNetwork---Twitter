import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { User } from '../auth/user.decorator';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiBearerAuth()
@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAllComments(@User() user) {
    return await this.commentService.findAll(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createdComment(@User() user, @Body() dto: CreateCommentDto) {
    return await this.commentService.creatPost(dto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deletedComment(
    @User() user,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return await this.commentService.deleteComment(id, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updatedComment(
    @User() user,
    @Body() updateCommentDto: UpdateCommentDto,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return await this.commentService.updateComment(
      user.userId,
      updateCommentDto,
      id,
    );
  }
}
