import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./routes/auth";

const app = express();

app.use(helmet());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/auth", authRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;
