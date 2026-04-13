import Draw from "../models/draw.js";

// ➤ Check participation
export const getParticipation = async (req, res) => {
  try {
    const userId = req.user.id;
    const currentMonth = new Date().toISOString().slice(0, 7);

    const entry = await Draw.findOne({
      user: userId,
      month: currentMonth,
    });

    res.json({ joined: !!entry });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// ➤ Participate
export const participate = async (req, res) => {
  try {
    const userId = req.user.id;
    const currentMonth = new Date().toISOString().slice(0, 7);

    const existing = await Draw.findOne({
      user: userId,
      month: currentMonth,
    });

    if (existing) {
      return res.status(400).json({ message: "Already participated" });
    }

    const entry = new Draw({
      user: userId,
      month: currentMonth,
    });

    await entry.save();

    res.json({ message: "Participation successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};