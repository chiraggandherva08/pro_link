const express = require("express");
const cors = require("cors");
const { mongodbConnect } = require("./connection");

const app = express();
mongodbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const connectionRoute = require("./routes/connectionsRoute");
const homeRoute = require("./routes/homeRoute");
const skillRoute = require("./routes/skillRoute");

app.use("/", skillRoute);
app.use("/", connectionRoute);
app.use("/", homeRoute);

const PORT = 8000;
app.listen(PORT, () => {
  console.log("Listening");
});
