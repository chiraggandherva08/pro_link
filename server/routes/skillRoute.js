const express = require("express");
const router = express.Router();
const fs = require("fs");
const PortfolioModel = require("../models/PortfolioModel");

router.get("/api/skills", async (req, res) => {
  const skills = fs.readFileSync("./skills.json", "utf8");
  res.json(JSON.parse(skills));
});

module.exports = router;
