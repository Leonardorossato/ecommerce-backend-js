const express = require("express");
const app = express();
const cores = require("cors");
const cookies = require("cookie-parser");
const processEnv = require("./env/envoriment");
const mongooseConenction = require("./config/mongo.config");

app.use(express.json());
app.use(cores());
app.use(cookies());

mongooseConenction();

app.listen(() => {
  console.log(`Server application is running at ${processEnv.APP_PORT}`);
});
