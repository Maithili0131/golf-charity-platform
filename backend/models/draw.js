import mongoose from "mongoose";

const drawSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  month: String,
});

export default mongoose.model("Draw", drawSchema);