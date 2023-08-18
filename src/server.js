const express = require("express");
const app = express();
const cores = require("cors");
const cookies = require("cookie-parser");
const processEnv = require("./env/envoriment");

app.use(express.json());
app.use(cores());
app.use(cookies());

app.listen(() => {
  console.log(`Server application is running at ${processEnv.APP_PORT}`);
});
