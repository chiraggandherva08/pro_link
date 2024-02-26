const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const url = process.env.CONNECTION_URL;

async function mongodbConnect() {
  return await mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to db..."))
    .catch((err) => console.log("Error", err));
}

module.exports = { mongodbConnect };
