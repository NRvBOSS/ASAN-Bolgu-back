const User = require("../models/userModels");
const bcrypt = require("bcrypt");

// POST a new user
const createUser = async (req, res) => {
  const { name, email, password, pin } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User.create({
      name,
      email,
      password: hashedPassword,
      pin,
    });
    res.status(201).json({
      message: "User added successfully",
      volunteer: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { error } = loginValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Email or password is wrong" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json({ error: "Password is wrong" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.header("auth-token", token).json({
      token,
      name: user.name,
      email: user.email,
      id: user._id,
      message: "Logged in successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = {
  createUser,
  loginUser,
};
