const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const volunteerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["kişi", "qadın"],
    },
    rest: {
      type: String,
      enum: [
        "bazar ertəsi",
        "çərşənbə axşamı",
        "çərşənbə",
        "cümə axşamı",
        "cümə",
        "şənbə",
        "bazar",
      ],
      required: false,
    },
    role: {
      type: String,
      required: true,
      enum: ["könüllü", "sorğu rəhbəri", "qrup rəhbəri", "digər"],
      default: "könüllü",
    },
    period: {
      type: String,
      required: true,
      enum: ["1", "2", "3"],
    },
    // YENİ SAHƏ
    activityHistory: [
      {
        activity: String,
        period: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Volunteer", volunteerSchema);