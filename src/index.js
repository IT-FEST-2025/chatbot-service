import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import logger from "./config/logger.js";
import router from "./routes/index.js";
import { authenticate } from "./middlewares/auth.middleware.js";

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hai ganteng");
});

// Routes
app.use("/api", authenticate, router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`);
});
