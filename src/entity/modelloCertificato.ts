import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
  import { Utenti } from "./utente";

@Entity()
export class Certificato {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Certificato, (user) => user.id)
  createdBy?: Utenti | null;

  @Column({ nullable: true })
  TipoCertificato!: string;

  @Column({ nullable: true })
  titolo!: string;

  @Column({ nullable: true })
  siAttestaChe!: string;

  @Column({ nullable: true })
  sottotitolo!: string;

  @Column({ nullable: true })
  luogoFormazione!: string;

  @Column({ nullable: true })
  sottotitolo2!: string;

  @Column({ nullable: true })
  carica1!: string;

  @Column({ nullable: true })
  carica2!: string;

  @Column({ nullable: true })
  carica3!: string;
}
