import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { ShareEntity } from '../entities/share.entity';
import { CreateShareDto } from './dto/create-share.dto';

@Injectable()
export class ShareService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ShareEntity)
    private readonly shareRepository: Repository<ShareEntity>,
  ) {}

  async getAllShare(userId: number) {
    return await this.shareRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async sharedUser(dto: CreateShareDto, UserId: number) {
    const user = await this.userRepository.findOne({ where: { id: UserId } });
    if (!user) {
      throw new HttpException(`User Not Found`, HttpStatus.NOT_FOUND);
    }
    const sentUser = await this.userRepository.findOne({
      where: { id: dto.sharedUserId },
    });
    if (!sentUser) {
      throw new HttpException(`User Not Found`, HttpStatus.NOT_FOUND);
    }

    const share = new ShareEntity();

    share.user = user;
    share.sentUser = sentUser;

    return await this.shareRepository.save(share);
  }

  async deletedShare(userId: number, shareId: number): Promise<void> {
    const deleteShare = await this.shareRepository.findOne({
      where: { id: shareId },
      relations: ['user'],
    });
    if (!deleteShare) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }
    if (deleteShare.user.id === userId) {
      await this.shareRepository.remove(deleteShare);
    }
  }
}
