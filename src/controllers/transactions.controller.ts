import { Request, Response } from "express";
import { Accounts } from "../entity/Accounts";
import { Transactions } from "../entity/Transactions";

interface TransactionsBody {
  value: number;
  debitedAccount: Accounts;
  creditedAccount: Accounts;
}

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transactions.find();
    return res.json(transactions);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transaction = await Transactions.findOneBy({ id: parseInt(id) });

    if (!transaction) return res.status(404).json({ message: "Not found" });

    return res.json(transaction);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const newTransaction = async (
  req: Request<TransactionsBody>,
  res: Response
) => {
  const { value, debitedAccount, creditedAccount } = req.params;
  const transaction = new Transactions();
  transaction.value = value;
  transaction.debitedAccount = debitedAccount;
  transaction.creditedAccount = creditedAccount;
  await transaction.save();
  return res.json(transaction);
}

export const updateTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const transaction = await Transactions.findOneBy({ id: parseInt(id) });
    if (!transaction) return res.status(404).json({ message: "Not found" });

    await Transactions.update({ id: parseInt(id) }, req.body);

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Transactions.delete({ id: parseInt(id) });

    if (result.affected === 0)
      return res.status(404).json({ message: "Not found" });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
