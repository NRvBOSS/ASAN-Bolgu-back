const router = require("express").Router();
const {
  getAllActivities,
  addActivity,
  delActivity,
  updAct,
} = require("../controllers/activityController");

// Get all activities
router.get("/", getAllActivities);

// Add a new activity
router.post("/", addActivity);

// Delete activity by ID
router.delete("/:id", delActivity);

// Update activity by ID
router.patch("/:id", updAct);

module.exports = router;
