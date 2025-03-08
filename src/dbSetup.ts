import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const setupDatabase = async () => {
  try {
    console.log("📡 連線到 MySQL...");
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "",
    });

    console.log("🚀 建立資料庫 `Demo`...");
    await connection.query(`CREATE DATABASE IF NOT EXISTS Demo`);

    console.log("🔗 連線到 `Demo`...");
    await connection.changeUser({ database: "Demo" });

    console.log("🛠️ 建立 `users` 資料表...");
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `);

    console.log("✅ 資料庫與資料表建立完成！");
    await connection.end(); // 關閉連線
  } catch (error) {
    console.error("❌ 建立資料庫時發生錯誤:", error);
  }
};

// 執行設定
setupDatabase();
