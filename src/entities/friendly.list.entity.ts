import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('friendly-list')
export class FriendlyListEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.friendshipSender, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.friendshipTake, {
    onDelete: 'CASCADE',
  })
  take: UserEntity;
}
