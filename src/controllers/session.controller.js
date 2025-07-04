import logger from "../config/logger.js";
import sessionService from "../services/session.service.js";

const createSession = async (req, res) => {
  try {
    const { id } = req.user;
    const data = { userId: id };

    logger.info("[session.controller] create new session", { data });
    const session = await sessionService.create(data);

    res.status(201).json({
      message: `session (userId: ${id}) created successfuly`,
      data: session,
    });
  } catch (error) {
    logger.error("[500/session.controller] failed to create new session", {
      error,
    });
    res.status(500).json({ error: error.message });
  }
};

const getSessions = async (req, res) => {
  try {
    const { id } = req.user;
    const sessions = await sessionService.get(id);
    res.status(200).json({
      message: `session (userId: ${id}) fetched successfuly`,
      data: sessions,
    });
  } catch (error) {
    logger.error("[500/session.controller] failed to get sessions", {
      error,
    });
    res.status(500).json({ error: error.message });
  }
};

const deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    logger.info(`[session.controller] delete session (id: ${sessionId})`);
    const session = await sessionService.destroy(sessionId);
    res.json({
      message: `session (id: ${sessionId}) deleted successfuly`,
      data: session,
    });
  } catch (error) {
    logger.error("[500/session.controller] failed to delete session", {
      error,
    });
    res.status(500).json({ error: error.message });
  }
};

export default { createSession, getSessions, deleteSession };
