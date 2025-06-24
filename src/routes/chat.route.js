import express from "express";
import chatController from "../controllers/chat.controller.js";

const chatRouter = express.Router();

chatRouter.post("/", chatController.sendMessage);
chatRouter.get("/history/:sessionId", chatController.getMessagesHistory);

export default chatRouter;
