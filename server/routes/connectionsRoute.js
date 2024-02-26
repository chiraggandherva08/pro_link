const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const PortfolioModel = require("../models/PortfolioModel");

async function findConnectionsFollowers(nickname) {
  return await PortfolioModel.find({ nickname: nickname });
}

router.get("/connections", async (req, res) => {
  const { nickname } = req.query;
  const allfollowers = await findConnectionsFollowers(nickname);

  if (allfollowers.length === 0) {
    res.json({});
  } else {
    res.json({
      followers: allfollowers[0].followers,
      following: allfollowers[0].following,
    });
  }
});

module.exports = router;
