import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
// Remove incorrect import if Utenti is not the creator based on FK error
// import { Utenti } from "./utente";

@Entity('user') // Explicitly name table to match error message `cdt`.`user`
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

  // Self-referencing: A user created by another user. FK is createdById referencing User.id
  @ManyToOne(() => User, user => user.createdUsers, { nullable: true, onDelete: 'SET NULL' }) // Setting FK column to NULL on delete
  @JoinColumn({ name: 'createdById' }) // Specify the FK column name from the error
  createdBy?: User | null;

  // Explicitly define the FK column (optional but good practice with JoinColumn)
  // Ensure this column exists in your 'user' table schema and allows NULLs.
  @Column({ name: 'createdById', nullable: true })
  createdById?: number | null;

  // Inverse side: Users created by this user.
  @OneToMany(() => User, user => user.createdBy)
  createdUsers?: User[];
}
