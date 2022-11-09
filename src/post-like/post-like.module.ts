import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { PostEntity } from '../entities/post.entity';
import { PostLikeEntity } from '../entities/post.like.entity';
import { PostLikeController } from './post-like.controller';
import { PostLikeService } from './post-like.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostLikeEntity, UserEntity, PostEntity])],
  controllers: [PostLikeController],
  providers: [PostLikeService],
})
export class PostLikeModule {}
