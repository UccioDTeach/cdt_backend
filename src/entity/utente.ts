import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";
import { Certificato } from "./modelloCertificato";

@Entity()
export class Utenti {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ unique: true })
  email!: string;
  @Column({})
  password!: string;

  @OneToMany(() => User, user => user.createdBy)
  createdUsers?: User[];

  @OneToMany(() => Certificato, cert => cert.createdBy)
  createdCertificates?: Certificato[];
}
