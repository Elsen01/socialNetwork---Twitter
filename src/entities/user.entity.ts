import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { RoleEnum } from '../role.enum';
import { PostEntity } from './post.entity';
import { CommentEntity } from './comment.entity';
import { IsEmail } from 'class-validator';
import { PostLikeEntity } from './post.like.entity';
import { CommentLikeEntity } from './comment.like.entity';
import { BannedListEntity } from './banned.list.entity';
import { ShareEntity } from './share.entity';
import { FriendlyListEntity } from './friendly.list.entity';
import { MessagesEntity } from './messages.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true, unique: true })
  username: string;

  @Column()
  age: number;

  @Column({ nullable: false, unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ enum: RoleEnum, type: 'enum' })
  role: RoleEnum;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => PostLikeEntity, (like) => like.user)
  likes: PostLikeEntity[];

  @OneToMany(() => CommentLikeEntity, (ComLike) => ComLike.user)
  like: CommentLikeEntity[];

  @OneToMany(() => BannedListEntity, (banned) => banned.user)
  banned: BannedListEntity[];

  @OneToMany(() => BannedListEntity, (banned) => banned.user)
  banning: BannedListEntity[];

  @OneToMany(() => ShareEntity, (share) => share.user)
  sent: ShareEntity[];

  @OneToMany(() => ShareEntity, (share) => share.user)
  sender: ShareEntity[];

  @OneToMany(() => FriendlyListEntity, (friend) => friend.user)
  friendshipSender: FriendlyListEntity[];

  @OneToMany(() => FriendlyListEntity, (friend) => friend.user)
  friendshipTake: FriendlyListEntity[];

  @OneToMany(() => MessagesEntity, (message) => message.user)
  userMess: MessagesEntity[];

  @OneToMany(() => FriendlyListEntity, (friend) => friend.user)
  messSender: MessagesEntity[];
}
