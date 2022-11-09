import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { PostLikeEntity } from '../entities/post.like.entity';
import { CreatePostLikeDto } from './dto/create-post-like.dto';

@Injectable()
export class PostLikeService {
  constructor(
    @InjectRepository(PostLikeEntity)
    private readonly postLikeRepository: Repository<PostLikeEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async postLike(dto: CreatePostLikeDto, userId: number) {
    const postExist = await this.postLikeRepository.findOne({
      where: { user: { id: userId }, post: { id: dto.postId } },
    });
    if (postExist) {
      throw new HttpException(`userin  likesi var`, HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }
    const post = await this.postRepository.findOne({
      where: { id: dto.postId },
    });
    if (!post) {
      throw new HttpException(`Post not found`, HttpStatus.NOT_FOUND);
    }
    const like = new PostLikeEntity();
    like.user = user;
    like.post = post;

    const newLike = await this.postLikeRepository.save(like);

    const { user: userLike, post: postLike, ...postLikeResponse } = newLike;

    return postLikeResponse;
  }

  async postUnlike(postId: number, userId): Promise<void> {
    const likes = await this.postLikeRepository.findOne({
      where: { id: postId },
      relations: ['user'],
    });
    if (!likes) {
      throw new HttpException(`Not found`, HttpStatus.NOT_FOUND);
    }
    if (likes.user.id === userId) {
      await this.postLikeRepository.remove(likes);
      return;
    }
    throw new HttpException(`not found`, HttpStatus.NOT_FOUND);
  }
}
