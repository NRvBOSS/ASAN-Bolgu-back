// config/distributionRules.js
module.exports = {
  activities: {
    bagca: {
      type: "oturaqli",
      gender: ["woman"],
      limit: 1,
      oncePerCycle: true, // hamı getməyincə təkrar olmaz
    },
    sorgu: {
      type: "ayaqustu",
      gender: ["man", "woman"],
      limit: 3,
      minGapForRepeat: 3, // 3 fəaliyyət aralıq
    },
    yon2: {
      type: "ayaqustu",
      gender: ["man", "woman"],
      limit: 2,
    },
    yon3: {
      type: "ayaqustu",
      gender: ["man", "woman"],
      limit: 2,
    },
    vvaq: {
      type: "oturaqli",
      gender: ["man", "woman"],
      limit: 2,
      exclusiveForDay: true, // bu gün başqa fəaliyyət olmaz
    },
    masa: {
      type: "oturaqli",
      gender: ["man", "woman"],
      limit: null, // limitsiz
      notCountAsActivity: true, // fəaliyyət sayılmır
    },
  },
  periods: {
    weekday: {
      1: { start: "09:00", end: "13:00" },
      2: { start: "11:00", end: "15:00" },
      3: { start: "13:00", end: "18:00" },
    },
    weekend: {
      1: { start: "09:00", end: "12:20" },
      2: { start: "12:20", end: "16:00" },
      3: { start: "12:20", end: "16:00" },
    },
  },
};
