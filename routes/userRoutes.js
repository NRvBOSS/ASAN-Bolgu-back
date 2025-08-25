const { createUser, loginUser } = require("../controllers/userController");
const router = require("express").Router();

// POST a new user
router.post("/", createUser);

// Login a user
router.post("/login", loginUser);

module.exports = router;
