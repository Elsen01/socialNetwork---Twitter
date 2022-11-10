import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';
import { CreateMessageDto } from './dto/messaages.request.dto';

@ApiBearerAuth()
@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createdMessage(@User() user, @Body() dto: CreateMessageDto) {
    return await this.messageService.createMessage(dto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deletedMessage(
    @User() user,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return await this.messageService.deleteMessage(user.userId, id);
  }
}
