import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Assignment {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    volunteerId: number
    @Column()
    title: string
    @Column()
    description: string
    @Column()
    date: Date

}