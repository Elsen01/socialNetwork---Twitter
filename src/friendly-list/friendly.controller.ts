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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FriendlyService } from './friendly.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';
import { CreateFriendshipListDto } from './dto/create-friendship-list.dto';

@ApiBearerAuth()
@ApiTags('friendship-list')
@Controller('friendship')
export class FriendlyController {
  constructor(private readonly friendlyService: FriendlyService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllFriend(@User() user) {
    return await this.friendlyService.getAllFriend(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async friendTake(@User() user, @Body() dto: CreateFriendshipListDto) {
    return await this.friendlyService.userTake(dto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async removeTake(@User() user, @Param('id', new ParseIntPipe()) id: number) {
    return await this.friendlyService.deleteTake(user.userId, id);
  }
}
