const express = require("express");
const router = express.Router();
const {
  distributeVolunteers,
} = require("../controllers/distributeControllers");

// Könüllüləri qaydalara görə böl, amma DB-yə yazma
router.get("/distVols", distributeVolunteers);

// // Təsdiq edildikdə tarixçəyə yaz
// router.post("/confirm", confirmDistribution);

module.exports = router;
