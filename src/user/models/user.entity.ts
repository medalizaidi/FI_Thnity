/* eslint-disable prettier/prettier */
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true})
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  admin: boolean;

  @Column({ nullable: true })
  name: string;

  @BeforeInsert()
  emailToLower() {
    this.email = this.email.toLowerCase();
  }
}
