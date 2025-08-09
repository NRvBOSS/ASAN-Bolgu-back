const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // participants: [
    //   {
    //     type: String,
    //     trim: true,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Activity", activitySchema);
