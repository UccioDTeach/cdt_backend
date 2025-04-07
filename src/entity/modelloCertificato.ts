import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany } from "typeorm";
import { Utenti } from "./utente";

@Entity('certificato')
export class Certificato {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  dataEmissione!: Date;

  @Column()
  tipoCertificato!: string;

  @Column()
  filePDF!: string;

  @ManyToOne(() => Certificato, cert => cert.derivedCertificates, { 
    nullable: true, 
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'createdById' })
  createdBy?: Certificato | null;

  @OneToMany(() => Certificato, cert => cert.createdBy)
  derivedCertificates?: Certificato[];

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