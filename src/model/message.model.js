import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  sender: {
    type: String,
    enum: ["user", "model"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  edited: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", MessageSchema);

export default Message;
