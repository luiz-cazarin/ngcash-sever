import { Request, Response } from "express";
import { Accounts } from "../entity/Accounts";
import { Users } from "../entity/Users";

interface UserBody {
  id: number;
  username: string;
  password: string;
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await Users.find();
    return res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await Users.findOneBy({ id: parseInt(id) });

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const createUser = async (req: Request<UserBody>, res: Response) => {
  const { username, password, accountsId } = req.body;
  const user = new Users();
  user.username = username;
  user.password = password;

  const validateUser = await Users.findOneBy({ username: username });
  if (user.username.length < 3) {
    return res.status(404).json({ message: "The username is invalid" });
  }
  if (user.password.length < 3) {
    return res.status(404).json({ message: "The password is invalid" });
  }
  if (validateUser) {
    return res.status(404).json({ message: "The user already exists" });
  } else {
    await user.save();
  }
  return res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await Users.findOneBy({ id: parseInt(id) });
    if (!user) return res.status(404).json({ message: "Not user found" });

    await Users.update({ id: parseInt(id) }, req.body);

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Users.delete({ id: parseInt(id) });

    if (result.affected === 0)
      return res.status(404).json({ message: "User not found" });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
