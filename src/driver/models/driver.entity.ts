/* eslint-disable prettier/prettier */
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class DriverEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  DriverName: string;
  @Column()
  departure: string;
  @Column()
  destination: string;
  @CreateDateColumn({ type: 'date' }) // Specify type as 'date'
  date: Date;
  @Column()
  nbredeplace: number;
  @Column()
  prix: number;
  @Column()
  numero:string;
  @Column( { nullable: true })
  heure:string;
  @BeforeInsert()
  DriverNametolower() {
    this.DriverName = this.DriverName.toLowerCase();
  }
  @Column()
  iddriver:number;
}
