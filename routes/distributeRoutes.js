const express = require("express");
const router = express.Router();
const {
  distributeVolunteers,
  updateVolunteerActivity,
  finalizeDistribution,
} = require("../controllers/distributeControllers");

// Könüllüləri qaydalara görə böl, amma DB-yə yazma
router.get("/distVols", distributeVolunteers);

// Seçimi təsdiqlə və tarixçəni yenilə
router.post("/finalize", finalizeDistribution);

// Update üçün
router.post("/update", updateVolunteerActivity);

module.exports = router;
