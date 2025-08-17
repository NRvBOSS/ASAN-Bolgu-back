const mongoose = require("mongoose");

const distributionHistorySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  assignments: { type: Array, required: true },
});

module.exports = mongoose.model(
  "DistributionHistory",
  distributionHistorySchema
);
