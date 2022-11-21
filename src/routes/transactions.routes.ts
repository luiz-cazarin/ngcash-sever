import { Router } from "express";
import {
  getTransactions,
  getTransaction,
  newTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactions.controller";

const router = Router();

router.get("/transactions", getTransactions);

router.get("/transactions/:id", getTransaction);

router.post("/transactions", newTransaction);

router.put("/transactions/:id", updateTransaction);

router.delete("/transactions/:id", deleteTransaction);

export default router;
