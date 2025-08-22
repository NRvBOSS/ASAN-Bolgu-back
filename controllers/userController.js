const User = require("../models/userModels");

// POST a new user
const createUser = async (req, res) => {
  const { name, email, password, pin } = req.body;
  try {
    const newUser = new User({ name, email, password, pin });
    await newUser.save();
    res.status(201).json({
      message: "User added successfully",
      volunteer: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

module.exports = {
  createUser,
};
