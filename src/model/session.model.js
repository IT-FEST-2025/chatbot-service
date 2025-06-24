import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    default: "Session Title",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Session = mongoose.model("Session", SessionSchema);

export default Session;
