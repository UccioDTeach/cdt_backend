import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export  class Utenti {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({})
    email!: string
    @Column({})
    password!: string
}