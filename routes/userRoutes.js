const {
  createUser,
  loginUser,
  getAllUser,
  deleteUser,
  checkPin,
} = require("../controllers/userController");
const router = require("express").Router();

// POST a new user
router.post("/", createUser);

// POST a new user
router.get("/", getAllUser);

// Delete a new user
router.delete("/", deleteUser);

// Login a user
router.post("/login", loginUser);

// Check pin
router.post("/pin", checkPin);

module.exports = router;
