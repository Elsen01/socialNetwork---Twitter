import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { FriendlyListEntity } from '../entities/friendly.list.entity';
import { FriendlyController } from './friendly.controller';
import { FriendlyService } from './friendly.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FriendlyListEntity])],
  controllers: [FriendlyController],
  providers: [FriendlyService],
})
export class FriendlyModule {}
