import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  cognome!: string;

  @Column()
  email?: string;

  @Column()
  dataNascita!: Date;

  @Column()
  dataRilascio!: Date;

  @Column()
  codiceFiscale!: string;

  @Column()
  validita!: Date;

  @Column()
  direttore!: string;

  @Column()
  istruttore!: string;

  @Column()
  codiceCertificato!: string;

  @ManyToOne(() => User, (user) => user.id)
  createdBy?: User | null;
}
