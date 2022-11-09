import { Column, Timestamp } from 'typeorm';
export class UserModel extends Timestamp {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
