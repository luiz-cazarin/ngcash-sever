import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  Double,
} from "typeorm";

@Entity()
export class Transactions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: Double;

  @CreateDateColumn()
  createdAt: Date;
  
//   @OneToMany(()=>Accounts, (accounts) => accounts.id)
//   accounts: Accounts[]
}
