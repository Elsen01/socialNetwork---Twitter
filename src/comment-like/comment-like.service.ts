import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CommentLikeEntity } from '../entities/comment.like.entity';
import { CommentEntity } from '../entities/comment.entity';
import { CreateCommentLikeDto } from './dto/create-comment-like.dto';

@Injectable()
export class CommentLikeService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CommentLikeEntity)
    private readonly commentLikeRepository: Repository<CommentLikeEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async getAllCommentLike(userId: number) {
    return await this.commentLikeRepository.findOne({
      where: { id: userId },
      relations: ['user'],
    });
  }

  async creatCommentLike(dto: CreateCommentLikeDto, userId: number) {
    const commentExits = await this.commentLikeRepository.findOne({
      where: { user: { id: userId }, comment: { id: dto.commentId } },
    });
    if (commentExits) {
      throw new HttpException(
        `user likes are available`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new HttpException(`user not found`, HttpStatus.NOT_FOUND);
    }
    const comment = await this.commentRepository.findOne({
      where: { id: dto.commentId },
    });
    if (!comment) {
      throw new HttpException(`Comment not found`, HttpStatus.NOT_FOUND);
    }
    const comLike = new CommentLikeEntity();
    comLike.comment = comment;
    comLike.user = user;

    const commentsLike = await this.commentLikeRepository.save(comLike);

    const {
      user: userLike,
      comment: commentLike,
      ...commentResponse
    } = commentsLike;

    return commentResponse;
  }

  async unlikeCommentLike(userId: number, commentId: number): Promise<void> {
    const like = await this.commentLikeRepository.findOne({
      where: { id: commentId },
      relations: ['user'],
    });
    if (!like) {
      throw new HttpException(`comment not found`, HttpStatus.NOT_FOUND);
    }
    if (like.user.id === userId) {
      await this.commentLikeRepository.remove(like);
      return;
    }
  }
}
