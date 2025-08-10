const router = require("express").Router();
const {
  getAllVolunteers,
  addVolunteer,
  delAllVol,
} = require("../controllers/volunteerController");

// Get all volunteers
router.get("/", getAllVolunteers);

// Add a new volunteer
router.post("/", addVolunteer);

// Delete all volunteers
router.delete("/", delAllVol);

module.exports = router;
