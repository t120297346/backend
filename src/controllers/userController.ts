import { Request, Response } from "express";
import pool from "../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const db = require("../models/index");

const createUser = async (req: Request, res: Response): Promise<any> => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "請填寫所有欄位" });
  }

  try {
    // 對密碼進行加密
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.insert("users", {
      username,
      email,
      password: hashedPassword, // 儲存加密後的密碼
    });
    return res.json({ message: "用戶新增成功" });
  } catch (error) {
    return res.status(500).json({ message: (error as any).code });
  }
};

const login = async (req: Request, res: Response): Promise<any>=> {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: "請填寫 Email 和密碼" });
    }
  
    try {
      // 🔹 1. 查詢用戶是否存在
      const users = await db.find("users", "username", username);
  
      if (users.length === 0) {
        return res.status(404).json({ message: "用戶不存在" });
      }
  
      const user = users[0];
  
      // 🔹 2. 驗證密碼是否正確
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "密碼錯誤" });
      }
  
      // 🔹 3. 生成 JWT Token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" } // Token 1 小時過期
      );
  
      // 🔹 4. 回傳 Token 給前端
      return res.json({ message: "登入成功", token });
    } catch (error) {
      console.error("❌ 登入錯誤:", error);
      return res.status(500).json({ message: "伺服器錯誤" });
    }
  };


module.exports = {
    createUser,
    login,
}
