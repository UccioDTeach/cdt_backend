import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Utenti as LoggedInUser } from "./utente";

@Entity('certificato')
export class Certificato {
  @PrimaryGeneratedColumn()
  id!: number;


  @Column()
  tipoCertificato!: string;

  @ManyToOne(() => LoggedInUser, user => user.createdCertificates, {
    nullable: false,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'createdById' })
  createdBy!: LoggedInUser;

  @Column({ nullable: true })
  titolo?: string;

  @Column({ nullable: true })
  siAttestaChe?: string;

  @Column({ nullable: true })
  sottotitolo?: string;

  @Column({ nullable: true })
  luogoFormazione?: string;

  @Column({ nullable: true })
  sottotitolo2?: string;

  @Column({ nullable: true })
  carica1?: string;

  @Column({ nullable: true })
  carica2?: string;

  @Column({ nullable: true })
  carica3?: string;
}