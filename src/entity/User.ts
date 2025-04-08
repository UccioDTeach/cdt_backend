import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Utenti } from "./utente";
// import { Certificato } from "./modelloCertificato"; // No longer needed here

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  cognome!: string;

  @Column({ type: 'date' })
  dataNascita!: string;

  @Column({ unique: true })
  codiceFiscale!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ type: 'date' })
  dataRilascio!: string;

  @Column({ type: 'date' })
  validita!: string;

  @Column()
  direttore!: string;

  @Column()
  istruttore!: string;

  @Column()
  codiceCertificato!: string;

  @ManyToOne(() => Utenti, (utente) => utente.createdUsers, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: "createdById" })
  createdBy?: Utenti | null;

  // Explicitly define the FK column (if it exists and you want TypeORM to manage it)
  @Column({ name: 'createdById', nullable: true })
  createdById?: number | null;
}
