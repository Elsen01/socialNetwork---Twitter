import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
