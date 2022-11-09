import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ShareService } from './share.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';
import { CreateShareDto } from './dto/create-share.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('share')
@Controller('share')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async allShare(@User() user) {
    return await this.shareService.getAllShare(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async shared(@User() user, @Body() dto: CreateShareDto) {
    return await this.shareService.sharedUser(dto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteShare(@User() user, @Param('id', new ParseIntPipe()) id: number) {
    return await this.shareService.deletedShare(user.userId, id);
  }
}
