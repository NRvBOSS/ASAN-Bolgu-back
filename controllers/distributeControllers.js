const Volunteer = require("../models/volunteerModels");

// Period qaydaları (sabitdir)
const rules = {
  periods: {
    weekday: {
      1: { start: "09:00", end: "13:00" }, // səhər növbəsi
      2: { start: "11:00", end: "15:00" }, // günorta növbəsi
      3: { start: "13:00", end: "18:00" }, // axşam növbəsi
    },
    weekend: {
      1: { start: "09:00", end: "12:20" }, // səhər növbəsi
      2: { start: "12:20", end: "16:00" }, // günorta növbəsi
      3: { start: "12:20", end: "16:00" }, // günorta növbəsi - eyni vaxt
    },
  },
};

// Hazırki saata uyğun period müəyyən etmə qaydası
function getCurrentPeriod(currentHour, currentMinute, isWeekend) {
  const totalMinutes = currentHour * 60 + currentMinute;

  if (isWeekend) {
    // Həftə sonu qaydası
    if (totalMinutes >= 540 && totalMinutes < 740) {
      // 9:00 - 12:20
      return 1;
    } else if (totalMinutes >= 740 && totalMinutes < 960) {
      // 12:20 - 16:00
      // Period 2 və 3 qarışıq - random seçim
      return Math.random() < 0.5 ? 2 : 3;
    } else {
      return 1; // default
    }
  } else {
    // Həftə içi qaydası
    if (totalMinutes >= 540 && totalMinutes < 660) {
      // 9:00 - 11:00
      return 1;
    } else if (totalMinutes >= 660 && totalMinutes < 900) {
      // 11:00 - 15:00
      return 2;
    } else if (totalMinutes >= 900 && totalMinutes < 1080) {
      // 15:00 - 18:00
      return 3;
    } else {
      return 1; // default
    }
  }
}

const distributeVolunteers = async (req, res) => {
  try {
    const now = new Date();
    const activityDay = now.getDay();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Həftə sonu və ya iş günü müəyyən et
    const isWeekend = activityDay === 0 || activityDay === 6;
    const act = isWeekend ? 10 : 13;

    // Uyğun period qaydalarını seç
    const periodRules = isWeekend
      ? rules.periods.weekend
      : rules.periods.weekday;

    // Hazırki saata uyğun periodu müəyyən et
    const currentPeriod = getCurrentPeriod(
      currentHour,
      currentMinute,
      isWeekend
    );

    console.log(
      `Hazırki saat: ${currentHour}:${currentMinute
        .toString()
        .padStart(2, "0")}`
    );
    console.log(`Gün növü: ${isWeekend ? "Həftə sonu" : "Həftə içi"}`);
    console.log(`Seçilən period: ${currentPeriod}`);
    console.log(
      `Period vaxtı: ${periodRules[currentPeriod].start} - ${periodRules[currentPeriod].end}`
    );

    const selectedVolunteers = await Volunteer.aggregate([
      {
        $match: {
          gender: "qadın",
          "activityHistory.activity": { $ne: "bagca" },
          role: { $nin: ["qrup rəhbəri", "sorğu rəhbəri", "digər"] },
          period: currentPeriod.toString(),
        },
      },
      { $sample: { size: act } },
    ]);

    console.log("Bağçada olmamış qızlar:", selectedVolunteers);
    console.log(
      `Seçilmiş say: ${selectedVolunteers.length}/${act} (${
        isWeekend ? "Həftə sonu" : "Həftə içi"
      }), Period: ${currentPeriod}`
    );

    res.json({
      volunteers: selectedVolunteers,
      count: selectedVolunteers.length,
      needed: act,
      isWeekend: isWeekend,
      currentPeriod: currentPeriod,
      periodTimeRange: `${periodRules[currentPeriod].start} - ${periodRules[currentPeriod].end}`,
      currentTime: `${currentHour}:${currentMinute
        .toString()
        .padStart(2, "0")}`,
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
