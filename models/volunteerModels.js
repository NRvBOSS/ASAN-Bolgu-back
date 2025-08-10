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
      // required: true,
      enum: ["man", "woman"],
    },
    rest:{
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Volunteer", volunteerSchema);