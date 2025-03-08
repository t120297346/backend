import express, { Request, Response } from "express";
import pool from "../database";

import dotenv from "dotenv";

const userController = require("../controllers/userController");

dotenv.config();
const router = express.Router();

// 取得所有用戶
router.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const [users] = await pool.query("SELECT * FROM users");
    return res.json(users); // ✅ 確保返回的是 `res.json()`
  } catch (error) {
    return res.status(500).json({ message: "伺服器錯誤" });
  }
});

// 新增用戶
router.post("/", userController.createUser);

// 登入
router.post("/login", userController.login);

export default router;
