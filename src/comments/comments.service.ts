import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostEntity } from '../entities/post.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(userId: number) {
    return await this.commentRepository.find({
      where: { user: { id: userId } },
      relations: ['post'],
    });
  }

  async creatPost(dto: CreateCommentDto, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('USER NOT FOUND');
    }

    const post = await this.postRepository.findOne({
      where: { id: dto.postId },
    });
    if (!post) {
      throw new HttpException(`post not found`, HttpStatus.NOT_FOUND);
    }

    const comment = new CommentEntity();
    comment.user = user;
    comment.body = dto.body;
    comment.post = post;

    const newComment = await this.commentRepository.save(comment);

    const {
      user: userComment,
      post: postComment,
      ...commentResponse
    } = newComment;
    return commentResponse;
  }

  async deleteComment(commentId: number, userId: number): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['user'],
    });
    if (!comment) {
      throw new HttpException(`comment not found`, HttpStatus.NOT_FOUND);
    }
    if (comment.user.id === userId) {
      await this.commentRepository.remove(comment);
      return;
    }
    throw new HttpException(
      `User comments are not available`,
      HttpStatus.NOT_FOUND,
    );
  }

  async updateComment(
    userId: number,
    updateCommentDto: UpdateCommentDto,
    commentId: number,
  ): Promise<any> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId, user: { id: userId } },
    });

    if (!comment) {
      throw new HttpException(
        `comment not found in user`,
        HttpStatus.NOT_FOUND,
      );
    }
    comment.body = updateCommentDto.body;

    return await this.commentRepository.save(comment);
  }
}
