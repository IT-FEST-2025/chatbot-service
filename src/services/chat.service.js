import axios from "axios";
import Message from "../model/message.model.js";
import Session from "../model/session.model.js";

const create = async (data) => {
  const { userId, sessionId, message } = data;
  if (!userId || !sessionId || !message) {
    throw new Error("Missing required fields");
  }

  // 1. Simpan pesan user ke database
  const userMessage = new Message({
    sessionId,
    userId,
    sender: "user",
    message,
  });
  await userMessage.save();

  const messageCount = await Message.countDocuments({ sessionId });
  const isFirstMessage = messageCount === 1;

  // 2. Ambil 5 message terakhir (user + bot) untuk konteks
  const lastMessages = await Message.find({ sessionId })
    .sort({ timestamp: -1 })
    .limit(5)
    .exec();

  // Mengurutkan kembali agar urutan percakapan benar (terlama ke terbaru)
  const messagesHistory = lastMessages.sort(
    (a, b) => a.timestamp - b.timestamp
  );

  // 3. Format buat gemini
  const formattedHistory = messagesHistory.map((msg) => ({
    role: msg.sender === "user" ? "user" : "model",
    parts: [{ text: msg.message }],
  }));

  // 4. Kirim ke gemini
  const GEMINI_URL = process.env.GEMINI_URL || "";
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

  if (!GEMINI_URL) throw new Error("GEMINI_URL not found");
  if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not found");

  const GEMINI_REQUEST = {
    contents: formattedHistory,
    generationConfig: {
      temperature: 0.9,
      maxOutputTokens: 700,
    },
  };

  const { data: geminiResponse } = await axios.post(
    `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
    GEMINI_REQUEST
  );

  if (!geminiResponse.candidates || geminiResponse.candidates.length === 0) {
    throw new Error("Respons tidak valid dari Gemini API.");
  }

  const botMessageText = geminiResponse.candidates[0].content.parts[0].text;

  // 5. Simpan pesan bot
  const botMessage = new Message({
    sessionId,
    userId,
    sender: "model",
    message: botMessageText,
  });
  await botMessage.save();

  // 6. Perbarui judul session jika ini pesan pertama
  if (isFirstMessage) {
    // gunakan 5 kata pertama dari pesan pengguna sebagai judul
    const newTitle = message.split(" ").slice(0, 5).join(" ");
    await Session.findByIdAndUpdate(sessionId, { title: newTitle });
  }

  // 7. Return result
  return botMessage;
};

const history = async (sessionId) => {
  const messages = await Message.find({ sessionId });
  return messages;
};

export default { create, history };
