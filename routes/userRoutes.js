const { createUser } = require("../controllers/userController");
const router = require("express").Router();

// POST a new user
router.post("/", createUser);

module.exports = router;
