const mongoose = require("mongoose");
const brandSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
