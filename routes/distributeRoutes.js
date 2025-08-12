const express = require("express");
const router = express.Router();
const {
  distributeVolunteers,
  confirmDistribution,
} = require("../controllers/distributeController");

// Könüllüləri qaydalara görə böl, amma DB-yə yazma
router.get("/preview", distributeVolunteers);

// Təsdiq edildikdə tarixçəyə yaz
router.post("/confirm", confirmDistribution);

module.exports = router;
