import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Volunteer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    gender: string;

    @Column("simple-array", { default: "" })
    history: string[]; // məsələn: ["Yön2", "Bağça", ...]

    @CreateDateColumn()
    createdAt: Date;
}
