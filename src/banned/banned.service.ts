import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { BannedListEntity } from '../entities/banned.list.entity';
import { CreateBannedDto } from './dto/banned-request.dto';

@Injectable()
export class BannedService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(BannedListEntity)
    private readonly bannedListRepository: Repository<BannedListEntity>,
  ) {}

  async getBannedAllUser(userId: number) {
    return await this.bannedListRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async bannedUser(dto: CreateBannedDto, userId: number) {
    const banned = await this.bannedListRepository.findOne({
      where: { user: { id: userId }, bannedUser: { id: dto.banUserId } },
    });

    if (banned) {
      throw new HttpException(`user bloklanmisdir`, HttpStatus.BAD_REQUEST);
    }
    const userExist = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!userExist) {
      throw new HttpException(`USER NOT FOUND`, HttpStatus.BAD_REQUEST);
    }

    const bannedUser = await this.userRepository.findOne({
      where: { id: dto.banUserId },
    });
    if (!bannedUser) {
      throw new HttpException(`User Not Found`, HttpStatus.NOT_FOUND);
    }

    const banUser = new BannedListEntity();
    banUser.user = userExist;
    banUser.bannedUser = bannedUser;

    return await this.bannedListRepository.save(banUser);
  }

  async deleteBanned(userId: number, bannedId: number): Promise<void> {
    const deleteBanned = await this.bannedListRepository.findOne({
      where: { id: bannedId },
      relations: ['user'],
    });
    if (!deleteBanned) {
      throw new HttpException(`user not found`, HttpStatus.NOT_FOUND);
    }
    if (deleteBanned.user.id === userId) {
      await this.bannedListRepository.remove(deleteBanned);
      return;
    }
  }
}
