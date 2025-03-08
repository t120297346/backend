import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import indexRoutes from "./routes/index";
import userRoutes from "./routes/userRoutes";
dotenv.config();

const app = express();
app.use(cors<Request>({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use(express.json()); // 允許 JSON 請求

const PORT = process.env.PORT || 5000;

app.use("/", indexRoutes);
// app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`⚡ 伺服器運行於 http://localhost:${PORT}`);
});
