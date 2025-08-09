const router = require("express").Router();
const {
  getAllActivities,
  addActivity,
} = require("../controllers/activityController");

// Get all activities
router.get("/", getAllActivities);

// Add a new activity
router.post("/", addActivity);

module.exports = router;
