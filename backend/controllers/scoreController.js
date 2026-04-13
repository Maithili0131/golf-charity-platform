import Score from "../models/Score.js";

// ➤ Add Score (max 5 scores)
export const addScore = async (req, res) => {
  try {
    const { score } = req.body;
    const userId = req.user.id;

    const scores = await Score.find({ user: userId }).sort({ date: 1 });

    if (scores.length >= 5) {
      await Score.findByIdAndDelete(scores[0]._id);
    }

    const newScore = new Score({
      user: userId,
      score,
      date: new Date(),
    });

    await newScore.save();

    res.status(201).json(newScore);

  } catch (error) {
    console.error("Add score error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ➤ Get Scores
export const getScores = async (req, res) => {
  try {
    const userId = req.user.id;

    const scores = await Score.find({ user: userId })
      .sort({ date: -1 })
      .limit(5);

    res.json(scores);

  } catch (error) {
    console.error("Get scores error:", error);
    res.status(500).json({ message: "Server error" });
  }
};