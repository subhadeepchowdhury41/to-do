import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import todoRouter from "./routes/todo.routes";

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to TODO backend.");
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/todo", todoRouter);

export default app;
