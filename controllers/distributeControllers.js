const scheduleRules = require("../utils/scheduleRules");
const Volunteer = require("../models/Volunteer");
const Activity = require("../models/Activity");

const distributeVolunteers = async (req, res) => {
  try {
    const isWeekend = [0, 6].includes(new Date().getDay());
    const rules = isWeekend ? scheduleRules.weekend : scheduleRules.weekday;

    const volunteers = await Volunteer.find();

    let assignments = {};

    volunteers.forEach((vol) => {
      const periodInfo = rules[vol.period];

      // Qaydalara görə filtr: gender, ayaqüstü/oturaqlı, bağça
      // (bu hissəni sənin qaydalarına uyğun yazmaq lazım olacaq)

      if (!assignments[vol.period]) assignments[vol.period] = [];
      assignments[vol.period].push({
        name: vol.name,
        gender: vol.gender,
        period: vol.period,
        start: periodInfo.start,
        end: periodInfo.end,
      });
    });

    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Error distributing volunteers", error });
  }
};

module.exports = { distributeVolunteers };
