const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Session = require("./models/session");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb+srv://MAANARMADA:Mn1994@mn.pzmi4gq.mongodb.net/Chrono", {
  useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log(err));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Keep track of the current session
let currentSession = null;

// Home Route
app.get("/", async (req, res) => {
  const sessions = await Session.find().sort({ createdAt: -1 }).lean();
  res.render("index", { sessions: sessions || [] });
});

// Save whole session on reset
app.post("/save", async (req, res) => {
  const { laps } = req.body;
  if (!laps || laps.length === 0) {
    return res.redirect("/");
  }
  const newSession = new Session({ laps });
  await newSession.save();
  res.redirect("/");
});



const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
