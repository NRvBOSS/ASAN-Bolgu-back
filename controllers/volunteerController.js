const Volunteer = require("../models/volunteerModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  volunteerValidationSchema,
} = require("../validation/volunteerValidation");

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
  const { name, gender } = req.body;
  try {
    const newVolunteer = new Volunteer({ name, gender });
    await newVolunteer.save();
    res.status(201).json({
      message: "Volunteer added successfully",
      volunteer: newVolunteer,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding volunteer", error });
  }
  ss;
};

module.exports = {
  getAllVolunteers,
  addVolunteer,
};
