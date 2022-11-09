import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { FriendlyListEntity } from '../entities/friendly.list.entity';
import { CreateFriendshipListDto } from './dto/create-friendship-list.dto';

@Injectable()
export class FriendlyService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(FriendlyListEntity)
    private readonly friendlyListRepository: Repository<FriendlyListEntity>,
  ) {}

  async getAllFriend(userId: number) {
    return await this.friendlyListRepository.findOne({
      where: { id: userId },
      relations: ['user'],
    });
  }

  async userTake(dto: CreateFriendshipListDto, userId: number) {
    const userExits = await this.friendlyListRepository.findOne({
      where: { user: { id: userId }, take: { id: dto.sendUserId } },
    });
    if (userExits) {
      throw new HttpException(
        `A request has been sent to the user`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }
    const findUser = await this.userRepository.findOne({
      where: { id: dto.sendUserId },
    });
    if (!findUser) {
      throw new HttpException(`user not found`, HttpStatus.NOT_FOUND);
    }
    const friend = new FriendlyListEntity();
    friend.user = user;
    friend.take = findUser;
    return await this.friendlyListRepository.save(friend);
  }

  async deleteTake(userId: number, takeId: number): Promise<void> {
    const removeFriend = await this.friendlyListRepository.findOne({
      where: { id: takeId },
      relations: ['user'],
    });
    if (!removeFriend) {
      throw new HttpException(`user not found`, HttpStatus.NOT_FOUND);
    }
    if (removeFriend.user.id === userId) {
      await this.friendlyListRepository.remove(removeFriend);
    }
  }
}
