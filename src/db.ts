import { DataSource } from "typeorm";
import { Users } from "./entity/Users";
import { Accounts } from "./entity/Accounts";
import { Transactions } from "./entity/Transactions";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "ngcash",
  synchronize: true,
  // logging: true,
  entities: [Users, Accounts, Transactions],
});
