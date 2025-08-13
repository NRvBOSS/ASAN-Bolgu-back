const Volunteer = require("../models/volunteerModels");
const rules = require("../config/distributionsRules");
const activityDay = new Date().getDay();
activityDay === 0 || activityDay === 6 ? (act = 10) : (act = 13);
const distributeVolunteers = async (req, res) => {
  try {
    const activityDay = new Date().getDay();
    const act = activityDay === 0 || activityDay === 6 ? 10 : 13;

    // Hamısını filter edirik: qadın, müəyyən rollar xaric, bagçada olmamış
    const allVolunteers = await Volunteer.find({
      gender: "qadın",
      "activityHistory.activity": { $ne: "bagca" },
      role: { $nin: ["qrup rəhbəri", "sorğu rəhbəri", "digər"] },
    });

    // Periodlara görə filter + random seçmək
    function getRandomSample(arr, size) {
      return arr.sort(() => 0.5 - Math.random()).slice(0, size);
    }

    const period1 = getRandomSample(
      allVolunteers.filter((v) => v.period === "1"),
      4
    );
    const period2 = getRandomSample(
      allVolunteers.filter((v) => v.period === "2"),
      4
    );
    const period3 = getRandomSample(
      allVolunteers.filter((v) => v.period === "3"),
      5
    );

    const selectedVolunteers = [...period1, ...period2, ...period3];

    res.json({
      volunteers: selectedVolunteers,
      count: selectedVolunteers.length,
      day: [
        "Bazar",
        "Bazar ertəsi",
        "Çərşənbə axşamı",
        "Çərşənbə",
        "Cümə axşamı",
        "Cümə",
        "Şənbə",
      ][activityDay],
    });
  } catch (error) {
    console.error("Volunteer distribution xətası:", error);
    res.status(500).json({
      message: "Könüllülərin paylanmasında xəta baş verdi",
      error: error.message,
    });
  }
};
module.exports = { distributeVolunteers };
