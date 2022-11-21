import { Request, Response } from "express";
import { Accounts } from "../entity/Accounts";

interface AccountBody {
  id: number;
  balance: number;
}

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const transactions = await Accounts.find();
    return res.json(transactions);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getAccount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transaction = await Accounts.findOneBy({ id: parseInt(id) });

    if (!transaction) return res.status(404).json({ message: "Not found" });

    return res.json(transaction);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const newAccount = async (
  req: Request<AccountBody>,
  res: Response
) => {
  return res.json({ res: req.body});
};

export const updateAccount = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const transaction = await Accounts.findOneBy({ id: parseInt(id) });
    if (!transaction) return res.status(404).json({ message: "Not found" });

    await Accounts.update({ id: parseInt(id) }, req.body);

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Accounts.delete({ id: parseInt(id) });

    if (result.affected === 0)
      return res.status(404).json({ message: "Not found" });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
