require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const Item = require("./models/Item");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("MongoDB Connected"));

/* REGISTER */
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json("User exists");

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashed });
  await user.save();

  res.json("Registered");
});

/* LOGIN */
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json("No user");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json("Wrong password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  // 👉 send token (even if not used)
  res.json({ token });
});

/* ❌ REMOVED AUTH FROM HERE */

/* ADD ITEM (NO AUTH NOW) */
app.post("/api/items", async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.json(item);
});

/* GET ALL */
app.get("/api/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

/* UPDATE */
app.put("/api/items/:id", async (req, res) => {
  await Item.findByIdAndUpdate(req.params.id, req.body);
  res.json("Updated");
});

/* DELETE */
app.delete("/api/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

/* SEARCH */
app.get("/api/items/search", async (req, res) => {
  const items = await Item.find({
    itemName: { $regex: req.query.name, $options: "i" }
  });
  res.json(items);
});

app.listen(5000, ()=>console.log("Server running"));