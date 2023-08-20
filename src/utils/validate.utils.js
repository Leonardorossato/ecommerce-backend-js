const mongoose = require("mongoose");
const validateId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid)
    return res
      .stautus(404)
      .json({ message: "This id is not valid or not Found" });
};
module.exports = validateId;
