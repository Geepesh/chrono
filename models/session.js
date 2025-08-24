const mongoose = require("mongoose");

const lapSchema = new mongoose.Schema({
  lapTime: String,
  interval: String
});

const sessionSchema = new mongoose.Schema({
  laps: [lapSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Session", sessionSchema);
