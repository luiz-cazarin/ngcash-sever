import express from "express";
import morgan from "morgan";
import cors from "cors";

import usersRoutes from "./routes/users.routes";
import accountsRoutes from "./routes/accounts.routes";
import transactinosRoutes from "./routes/transactions.routes";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", usersRoutes);
app.use("/api", accountsRoutes);
app.use("/api", transactinosRoutes);

export default app;
