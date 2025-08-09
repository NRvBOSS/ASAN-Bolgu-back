const mongoose = require("mongoose");

const assignmentHistory = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now },
    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
      required: true,
    },
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
    assignedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AssignmentHistory", assignmentHistory);
