const router = require("express").Router();
const {
  getVol,
  getAllVolunteers,
  addVolunteer,
  delAllVol,
  updVol,
  delVol,
} = require("../controllers/volunteerController");

// Get a single volunteer
router.get("/:id", getVol);

// Get all volunteers
router.get("/", getAllVolunteers);

// Add a new volunteer
router.post("/", addVolunteer);

// Delete all volunteers
router.delete("/", delAllVol);

// Delete a volunteer
router.delete("/:id", delVol);

// Update a volunteer
router.patch("/:id", updVol);

module.exports = router;
