const express = require("express");
const {
  saveDistribution,
  getHistoryByDate,
} = require("../controllers/historyController");

const router = express.Router();

router.post("/save", saveDistribution); // yeni bölüşdürmə əlavə et
router.get("/get", getHistoryByDate); // tarixə görə axtarış (?date=2025-08-17)

module.exports = router;
