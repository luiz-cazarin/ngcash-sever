import { Request, Response } from "express";
import { Double } from "typeorm";
import { Transactions } from "../entity/Transactions";

interface TransactionsBody {
  value: Double;
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
  req: Request<unknown, unknown, TransactionsBody>,
  res: Response
) => {
  return res.json({ res: req.body});
};

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
