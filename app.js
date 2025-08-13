require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const volunteerRoutes = require("./routes/volunteerRoutes");
const activityRoutes = require("./routes/activityRoutes");
const distributeRoutes = require("./routes/distributeRoutes");

// Express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, res.method);
  next();
});

// routes
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/distribute", distributeRoutes);

// connecting to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connecting to Db and listening on port", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
