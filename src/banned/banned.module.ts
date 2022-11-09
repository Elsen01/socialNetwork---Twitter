import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { BannedListEntity } from '../entities/banned.list.entity';
import { BannedController } from './banned.controller';
import { BannedService } from './banned.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, BannedListEntity])],
  controllers: [BannedController],
  providers: [BannedService],
})
export class BannedModule {}
