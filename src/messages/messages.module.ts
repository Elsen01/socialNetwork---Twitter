import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { MessagesEntity } from '../entities/messages.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, MessagesEntity])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
