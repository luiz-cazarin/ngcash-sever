import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Accounts } from "./Accounts";

@Entity()
export class Transactions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @CreateDateColumn()
  createdAt: Date;
  
  @ManyToOne(type => Accounts, transactions => Transactions)
  debitedAccount: Accounts

  @ManyToOne(type => Accounts, transactions => Transactions)
  creditedAccount: Accounts
}
