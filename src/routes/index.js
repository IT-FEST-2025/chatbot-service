import express from "express";
import sessionRouter from "./session.route.js";
import chatRouter from "./chat.route.js";

const router = express.Router();

router.use("/session", sessionRouter);
router.use("/chat", chatRouter);

export default router;
