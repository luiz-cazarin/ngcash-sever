import { Router } from "express";
import {
  getAccounts,
  getAccount,
  newAccount,
  updateAccount,
  deleteAccount
} from "../controllers/accounts.controller";

const router = Router();

router.get("/accounts", getAccounts);

router.get("/accounts/:id", getAccount);

router.post("/accounts", newAccount);

router.put("/accounts/:id", updateAccount);

router.delete("/accounts/:id", deleteAccount);

export default router;
