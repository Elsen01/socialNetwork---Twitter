import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOAuth2,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import e from 'express';
import { User } from '../auth/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiOAuth2([])
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateUserDto,
  })
  async creat(@Body() body: CreateUserDto) {
    console.log(body);
    //await FileHelper.createImage(file.image[0]);
    return 'success';
  }

  @Get()
  async findAllUsers() {
    return await this.usersService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id', new ParseIntPipe()) id: number) {
    return await this.usersService.findById(id);
  }

  @Post('')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number, @User() user) {
    return this.usersService.delete(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateUserDto })
  @Put('/:id')
  update(
    @User() user,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(user.userId, dto);
  }

  @Delete(':image')
  async deletePicture(@Param('fileName') fileName: string) {
    await fs.unlink(`../upload/ ${fileName}`, (err) => {
      if (err) {
        console.error(err);
        return err;
      }
    });
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'upload/images',
        filename(
          req: e.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          callback(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        comment: { type: 'string' },
        outletId: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile2(@UploadedFile('file') file) {
    console.log(file);
  }
}
