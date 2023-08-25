const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Método para verificar se a senha inserida corresponde à senha do usuário
module.exports.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Método para criar um token de redefinição de senha
module.exports.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutos
  return resetToken;
};
