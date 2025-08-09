const router = require("express").Router();
const {
  getAllVolunteers,
  addVolunteer,
} = require("../controllers/volunteerController");

// Get all volunteers
router.get("/", getAllVolunteers);

// Add a new volunteer
router.post("/", addVolunteer);

module.exports = router;
