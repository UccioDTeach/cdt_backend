import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

  @Column({ unique: true })
  codiceFiscale!: string;

  @Column()
  validita!: Date;

  @Column()
  direttore!: string;

  @Column()
  istruttore!: string;

  @Column()
  codiceCertificato!: string;
}
  