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
import { BannedService } from './banned.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';
import { CreateBannedDto } from './dto/banned-request.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseBannedDto } from './dto/banned-response.dto';

@ApiBearerAuth()
@ApiTags('banned-user')
@Controller('banned')
export class BannedController {
  constructor(private readonly bannedService: BannedService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ResponseBannedDto })
  @Get()
  async getAllBanned(@User() user) {
    return await this.bannedService.getBannedAllUser(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async banned(@User() user, @Body() dto: CreateBannedDto) {
    return await this.bannedService.bannedUser(dto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleted(@User() user, @Param('id', new ParseIntPipe()) id: number) {
    return await this.bannedService.deleteBanned(user.userId, id);
  }
}
