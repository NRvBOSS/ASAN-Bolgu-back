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

// Tarixə görə tarixçəni gətir (frontendə uyğun formatda)
const getHistoryByDate = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Tarix göndərilməyib",
      });
    }

    // Tarix aralığını təyin et (günün əvvəlindən axşamadək)
    const start = new Date(date);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    // Verilənləri bazadan al
    const history = await DistributionHistory.findOne({
      date: { $gte: start, $lte: end },
    }).lean();

    if (!history) {
      return res.status(200).json({
        success: true,
        date: date,
        message: "Bu tarix üçün məlumat tapılmadı",
        data: null,
      });
    }

    // Frontend üçün optimal formatda verilənləri hazırla
    const formattedData = {
      success: true,
      date: history.date.toISOString(),
      assignments: history.assignments.map((assignment) => ({
        activity: assignment.activity,
        volunteers: assignment.volunteers || [], // Hər fəaliyyət üçün könüllülər
      })),
      message: "Tarixçə uğurla alındı",
    };

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
