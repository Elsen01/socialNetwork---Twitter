import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { ShareEntity } from '../entities/share.entity';
import { ShareController } from './share.controller';
import { ShareService } from './share.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ShareEntity])],
  controllers: [ShareController],
  providers: [ShareService],
})
export class ShareModule {}
