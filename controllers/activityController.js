const Activity = require("../models/activityModels");

// Get all activities
const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find({});
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching activities", error });
  }
};

// Add a new activity
const addActivity = async (req, res) => {
  const { name } = req.body;
  try {
    const newActivity = new Activity({ name });
    await newActivity.save();
    res.status(201).json({
      message: "Activity added successfully",
      volunteer: newActivity,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding activity", error });
  }
};

module.exports = {
  addActivity,
  getAllActivities,
};
