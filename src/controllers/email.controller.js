const nodemailer = require("nodemailer");
const processEnv = require("../env/envoriment");

const sendEmail = async (req, res, data) => {
  try {
    let transport = nodemailer.createTransport({
      host: processEnv.NODEMAILER_HOST,
      port: processEnv.NODEMAILER_PORT,
      secure: false,
      auth: {
        user: processEnv.NODEMAILER_USER,
        pass: processEnv.NODEMAILER_PASSWORD,
      },
    });
    let info = {
      from: "Hey <abc@gmail.com>",
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
    };
    console.log(info.messageId);
    console.log(nodemailer.getTestMessageUrl(info));
  } catch (error) {
    return res.status(403).json({ message: "Error to send a email." });
  }
};

module.exports = sendEmail;
