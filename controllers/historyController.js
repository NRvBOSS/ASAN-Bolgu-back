// controllers/distributionHistoryController.js
const DistributionHistory = require("../models/historyModels");

// Yeni bölüşdürməni tarixçəyə əlavə et
const saveDistribution = async (req, res) => {
  try {
    const { assignments } = req.body;

    if (!assignments) {
      return res
        .status(400)
        .json({ message: "Assignments məlumatı göndərilməyib" });
    }

    const history = new DistributionHistory({
      date: new Date(), // bugünün tarixi
      assignments,
    });

    await history.save();

    res.status(201).json({
      message: "Bölüşdürmə tarixçəyə əlavə olundu",
      history,
    });
  } catch (error) {
    console.error("Tarixçəyə əlavə olunanda xəta:", error);
    res.status(500).json({ message: "Xəta baş verdi", error: error.message });
  }
};

// Tarixə görə tarixçəni gətir
const getHistoryByDate = async (req, res) => {
  try {
    const { date } = req.query; // ?date=2025-08-17 kimi
    if (!date) {
      return res.status(400).json({ message: "Tarix göndərilməyib" });
    }

    const start = new Date(date);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const history = await DistributionHistory.findOne({
      date: { $gte: start, $lte: end },
    });

    if (!history) {
      return res
        .status(404)
        .json({ message: "Bu tarix üçün məlumat tapılmadı" });
    }

    res.json(history);
  } catch (error) {
    console.error("Tarixçə alınanda xəta:", error);
    res.status(500).json({ message: "Xəta baş verdi", error: error.message });
  }
};

// Bütün tarixçəni gətir (opsional)
const getAllHistory = async (req, res) => {
  try {
    const history = await DistributionHistory.find().sort({ date: -1 });
    res.json(history);
  } catch (error) {
    console.error("Tarixçələr alınanda xəta:", error);
    res.status(500).json({ message: "Xəta baş verdi", error: error.message });
  }
};

module.exports = { saveDistribution, getHistoryByDate, getAllHistory };
