import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/post.request.dto';
import { UpdatePostDto } from './dto/post.request.dto';
import { UserEntity } from '../entities/user.entity';
import { v4 as uuid4 } from 'uuid';
import { unlink, writeFile } from 'fs/promises';
import { ResponsePostDto } from './dto/post.response.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(userId: number) {
    return await this.postsRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findById(userId: number, postId: number): Promise<any> {
    const post = await this.postsRepository.findOne({
      where: { id: postId, user: { id: userId } },
    });
    if (!post) {
      throw new HttpException(
        `The post is not available`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (post.user.id === userId) {
      // @ts-ignore
      return await this.postsRepository.findOne(findUser);
    }
  }

  async creatPost(
    createPostDto: CreatePostDto,
    userId: number,
    postUrl: Express.Multer.File,
  ) {
    const postImgUrl = uuid4() + postUrl.originalname;

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('USER NOT FOUND');
    }

    const post = new PostEntity();
    post.user = user;
    post.title = createPostDto.title;
    post.content = createPostDto.content;
    post.postUrl = postImgUrl;

    const [newPost] = await Promise.all([
      this.postsRepository.save(post),
      writeFile(`upload/images/${postImgUrl}`, postUrl.buffer),
    ]);
    return newPost;
  }

  async delete(postId: number, userId: number): Promise<void> {
    const findPost = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ['user'],
    });
    if (!findPost) {
      throw new HttpException(
        `The post is not available`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (findPost.user.id === userId) {
      await this.postsRepository.remove(findPost);
      return;
    }
    throw new BadRequestException(`user in post not found`);
    try {
      await unlink(`upload/images/${findPost.postUrl}`);
    } catch (err) {
      console.log(err);
    }
  }

  async updatePost(
    userId: number,
    updatePostDto: UpdatePostDto,
    postId: number,
    postUrl: Express.Multer.File,
  ): Promise<ResponsePostDto> {
    const post = await this.postsRepository.findOne({
      where: { id: postId, user: { id: userId } },
    });

    if (!post) {
      throw new HttpException(
        `The post is not available`,
        HttpStatus.NOT_FOUND,
      );
    }

    post.title = updatePostDto.title;
    post.content = updatePostDto.content;

    if (postUrl) {
      const image = uuid4() + postUrl.originalname;

      try {
        await unlink(`upload/images/${post.postUrl}`);
      } catch (err) {
        console.log(err.message);
      }
      post.postUrl = image;

      await writeFile(`upload/images/${image}`, postUrl.buffer);
    }
    console.log(post);

    return await this.postsRepository.save(post);
  }
}
