import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { CommentEntity } from '../entities/comment.entity';
import { CommentLikeEntity } from '../entities/comment.like.entity';
import { CommentLikeController } from './comment-like.controller';
import { CommentLikeService } from './comment-like.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentLikeEntity, UserEntity, CommentEntity]),
  ],
  controllers: [CommentLikeController],
  providers: [CommentLikeService],
})
export class CommentLikeModule {}
