import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Double,
  OneToMany,
} from "typeorm";
import { Transactions } from "./Transactions";

@Entity()
export class Accounts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  balance: Double;

  @OneToMany(() => Transactions, (transactions) => transactions)
  transactions: Transactions[];
}
