import express from "express";
import sessionController from "../controllers/session.controller.js";

const sessionRouter = express.Router();

sessionRouter.post("/", sessionController.createSession);
sessionRouter.get("/", sessionController.getSessions);
sessionRouter.delete("/:sessionId", sessionController.deleteSession);

export default sessionRouter;
