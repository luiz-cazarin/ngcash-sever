import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Transactions } from "./Transactions";
import { Users } from "./Users";

@Entity()
export class Accounts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  balance: number;

  @OneToOne( type => Users, accounts => Accounts)
  users: Users;

  @OneToMany(type => Transactions, accounts => Accounts)
  transactions: Transactions[];
}
