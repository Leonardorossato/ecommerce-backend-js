const mongoose = require("mongoose");
const processEnv = require("../env/envoriment");

const mongooseConenction = async () => {
  try {
    const connection = await mongoose.connect(processEnv.MONGO_URL);
    console.log("Connecttion with MongoDB successfully.");
  } catch (error) {
    console.error(error);
  }
};

module.exports = mongooseConenction;
