const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  nickname: { type: String, required: true, unique: true },
  css: { type: Object, required: false, unique: false },
  links: { type: Object, required: true, unique: false },
  photo: { type: String, required: true, unique: false },
  fname: { type: String, required: true, unique: false },
  lname: { type: String, required: true, unique: false },
  bio: { type: String, required: false, unique: false },
  visiblity: { type: String, required: true, unique: false },
  followers: { type: Object, required: true, unique: false },
  following: { type: Object, required: true, unique: false },
  projects: { type: Object, required: false, unique: false },
  skills: { type: Array, required: false, unique: false },
  certificates: { type: Object, required: false, unique: false },
});

const PortfolioModel = mongoose.model(`portfolio`, portfolioSchema);

module.exports = PortfolioModel;
