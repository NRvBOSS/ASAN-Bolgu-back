const router = require("express").Router();
const {
  getAllActivities,
  addActivity,
  delActivity,
} = require("../controllers/activityController");

// Get all activities
router.get("/", getAllActivities);

// Add a new activity
router.post("/", addActivity);

// Delete activity by ID
router.delete("/:id", delActivity);

module.exports = router;
