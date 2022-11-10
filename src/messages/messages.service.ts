import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { MessagesEntity } from '../entities/messages.entity';
import { CreateMessageDto } from './dto/messaages.request.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(MessagesEntity)
    private readonly messageRepository: Repository<MessagesEntity>,
  ) {}

  async createMessage(dto: CreateMessageDto, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new HttpException(`user not found`, HttpStatus.NOT_FOUND);

    const findUser = await this.userRepository.findOne({
      where: { id: dto.messSenderId },
    });
    if (!findUser) {
      throw new HttpException(`user not found`, HttpStatus.NOT_FOUND);
    }
    const newMessage = new MessagesEntity();
    newMessage.user = user;
    newMessage.sendUser = findUser;
    newMessage.body = dto.body;

    await this.messageRepository.save(newMessage);
  }

  async deleteMessage(userId: number, messageId: number): Promise<void> {
    const user = await this.messageRepository.findOne({
      where: { id: messageId },
      relations: ['user'],
    });
    if (!user) {
      throw new HttpException(`user not found`, HttpStatus.NOT_FOUND);
    }
    if (user.user.id === userId) {
      await this.messageRepository.remove(user);
    }
  }
}
