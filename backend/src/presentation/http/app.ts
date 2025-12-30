import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./routes/auth";
import collaboratorsRouter from "./routes/collaborators";
import objectivesRouter from "./routes/objectives";

const app = express();

app.use(helmet());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/collaborators", collaboratorsRouter);
app.use("/api", objectivesRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;
