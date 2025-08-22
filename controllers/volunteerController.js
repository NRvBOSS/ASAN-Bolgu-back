const Volunteer = require("../models/volunteerModels");
const {
  volunteerValidationSchema,
} = require("../validation/volunteerValidation");

// GET a single car
const getVol = async (req, res) => {
  const vol = await Volunteer.findById(req.params.id);

  if (!vol) {
    return res.status(404).json({ error: "No such volunteer" });
  }

  res.status(200).json(vol);
};

// Get all volunteers
const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find({});
    res.status(200).json(volunteers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching volunteers", error });
  }
};

// Add a new volunteer
const addVolunteer = async (req, res) => {
  const { error } = volunteerValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { name, gender, rest, role, period } = req.body;
  try {
    const newVolunteer = new Volunteer({ name, gender, rest, role, period });
    await newVolunteer.save();
    res.status(201).json({
      message: "Volunteer added successfully",
      volunteer: newVolunteer,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding volunteer", error });
  }
};

// Update a volunteer
const updVol = async (req, res) => {
  const { error } = volunteerValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const updatedVolunteer = await Volunteer.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
    if (!updatedVolunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    res.status(200).json({
      message: "Volunteer updated successfully",
      volunteer: updatedVolunteer,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating volunteer", error });
  }
};

// Delete a volunteer
const delVol = async (req, res) => {
  try {
    const deletedVolunteer = await Volunteer.findByIdAndDelete(req.params.id);
    if (!deletedVolunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    res.status(200).json({
      message: "Volunteer deleted successfully",
      volunteer: deletedVolunteer,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting volunteer", error });
  }
};

// Delete all volunteers
const delAllVol = async (req, res) => {
  try {
    await Volunteer.deleteMany({});
    res.status(200).json({ message: "All volunteers deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting volunteers", error });
  }
};

module.exports = {
  getVol,
  getAllVolunteers,
  addVolunteer,
  delVol,
  delAllVol,
  updVol,
};
