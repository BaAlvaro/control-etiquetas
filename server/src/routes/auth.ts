import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

type User = {
  id: number;
  username: string;
  passwordHash: string;
  role: "user" | "admin";
  warehouseId?: number;
};

const users: User[] = [];
let nextUserId = 1;

export const JWT_SECRET = "dev-secret-change-later";


router.post("/register", async (req: Request, res: Response) => {
  const { username, password, role } = (req.body || {}) as {
    username?: string;
    password?: string;
    role?: string;
  };

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Usuario y contraseña son obligatorios" });
  }

  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Formato inválido" });
  }

  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(409).json({ error: "El usuario ya existe" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: nextUserId++,
    username,
    passwordHash,
    role: role === "admin" ? "admin" : "user",
  };

  users.push(newUser);

  const token = jwt.sign(
    { userId: newUser.id, username: newUser.username, role: newUser.role },
    JWT_SECRET,
    { expiresIn: "8h" }
  );

  return res.status(201).json({
    token,
    user: {
      id: newUser.id,
      username: newUser.username,
      role: newUser.role,
    },
  });
});


router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = (req.body || {}) as {
    username?: string;
    password?: string;
  };

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Usuario y contraseña son obligatorios" });
  }

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "8h" }
  );

  return res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
  });
});


export default router;
