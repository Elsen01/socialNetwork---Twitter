import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { PostEntity } from '../entities/post.entity';
import { UserEntity } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, PostEntity, UserEntity])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
