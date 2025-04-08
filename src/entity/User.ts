import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Utenti } from "./utente";
// import { Certificato } from "./modelloCertificato"; // No longer needed here

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  cognome!: string;

  @Column({ type: "date", nullable: true })
  dataNascita!: string;

  @Column({ unique: true, nullable: true })
  codiceFiscale!: string;

  @Column({ unique: true, nullable: true })
  email!: string;

  @Column({ type: "date", nullable: true })
  dataRilascio!: string;

  @Column({ type: "date", nullable: true })
  validita!: string;

  @Column({ nullable: true })
  direttore!: string;

  @Column({ nullable: true })
  istruttore!: string;

  @Column({ nullable: true })
  codiceCertificato!: string;

  @Column({ nullable: true })
  voto!: string;

  @ManyToOne(() => Utenti, (utente) => utente.createdUsers, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "createdById" })
  createdBy?: Utenti | null;

  // Explicitly define the FK column (if it exists and you want TypeORM to manage it)
  @Column({ name: "createdById", nullable: true })
  createdById?: number | null;
}
