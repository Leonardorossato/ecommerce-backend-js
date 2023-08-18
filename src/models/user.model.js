const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    cart: { type: Array, default: [] },
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
    whihsList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timeseries: true,
  }
);

const User = mongoose.model("User", userSchema);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.passsword = await bcrypt.hash(this.passsword, salt);
});

userSchema.methods.isPasswordMatched = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.passsword);
};

module.exports = User;
