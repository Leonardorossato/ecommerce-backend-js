const mongoose = require("mongoose");
const cupomSchema = new mongoose.Schema({
  name: { type: String, required: true, uninque: true, uppercase: true },
  expire: { type: Date, required: true },
  discount: { type: Number, required: true },
});

const Cupom = mongoose.model("Cupom", cupomSchema);
module.exports = Cupom;
