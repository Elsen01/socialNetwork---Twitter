import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOAuth2,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/post.request.dto';
import { UpdatePostDto } from './dto/post.request.dto';
import { User } from '../auth/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponsePostDto } from './dto/post.response.dto';

@ApiBearerAuth()
@ApiOAuth2([])
@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'find all post' })
  @ApiOkResponse({ type: ResponsePostDto })
  @Get('/user')
  async findAllPosts(@User() user): Promise<ResponsePostDto[]> {
    return await this.postsService.findAll(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findById(@User() user, @Param('id', new ParseIntPipe()) id: number) {
    return await this.postsService.findById(id, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('postUrl'))
  @ApiOkResponse({ type: ResponsePostDto })
  async creatPost(
    @User() user,
    @Body(new ValidationPipe({ transform: true })) createPostDto: CreatePostDto,

    postUrl: Express.Multer.File,
  ) {
    return await this.postsService.creatPost(
      createPostDto,
      user.userId,
      postUrl,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deletedPost(@User() user, @Param('id', new ParseIntPipe()) id: number) {
    await this.postsService.delete(id, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('postUrl'))
  @Put('/:id')
  update(
    @User() user,
    @Param('id', new ParseIntPipe()) id: number,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    updatePostDto: UpdatePostDto,
    postUrl: Express.Multer.File,
  ): Promise<ResponsePostDto> {
    return this.postsService.updatePost(
      user.userId,
      updatePostDto,
      id,
      postUrl,
    );
  }
}
