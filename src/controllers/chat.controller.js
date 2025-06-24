import chatService from "../services/chat.service.js";
import logger from "../config/logger.js";

const sendMessage = async (req, res) => {
  try {
    const { sessionId, message } = req.body;
    const { id } = req.user;
    const data = {
      userId: id,
      sessionId,
      message,
    };

    logger.info("[chat.controller] sending new message", { data });

    const botResponse = await chatService.create(data);
    res.status(201).json({
      message: "Send message to chatbot successfuly",
      data: botResponse,
    });
  } catch (error) {
    logger.error("[500/chat.controller] failed to sending new message", {
      error,
    });
    res.status(500).json({ error: error.message });
  }
};

const getMessagesHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const history = await chatService.history(sessionId);
    res.json({
      message: `history (sessionId: ${sessionId}) fetched successfuly`,
      data: history,
    });
  } catch (error) {
    logger.error("[500/chat.controller] failed to get messages history", {
      error,
    });
    res.status(500).json({ error: error.message });
  }
};

export default { sendMessage, getMessagesHistory };
