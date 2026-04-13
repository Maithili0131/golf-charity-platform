import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  score: Number,
  date: Date
});

export default mongoose.model("Score", scoreSchema);