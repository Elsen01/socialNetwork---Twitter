import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('message')
export class MessagesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @ManyToOne(() => UserEntity, (user) => user.userMess, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.messSender, {
    onDelete: 'CASCADE',
  })
  sendUser: UserEntity;
}
