const cloudinary = require("cloudinary");
const processEnv = require("../env/envoriment");

cloudinary.v2.config({
  cloud_name: processEnv.CLOUDINARY_NAME,
  api_key: processEnv.CLOUDINARY_API_KEY,
  api_secret: processEnv.CLOUDINARY_API_SECRET,
});

const cloudinaryUploadImg = async (fileUpload) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(fileUpload, (error, result) => {
      if (error) {
        console.error("Erro ao fazer upload para o Cloudinary:", error);
        resolve(null); // Resolva com valor nulo em caso de erro
        return;
      }

      resolve({
        url: result.secure_url,
        resource_type: "auto",
      });
    });
  });
};

module.exports = cloudinaryUploadImg;
