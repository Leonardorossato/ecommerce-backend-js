const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    let uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-", +uniqueSuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "File unsupported format" }, false);
  }
};

const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fieldSize: 2000000 },
});

const productImgResize = async (req, res, next) => {
  if (!req.files) {
    return next();
  }
  await Promise.all(
    req.files.map(async (file) => {
      const filePath = path.join(
        __dirname,
        `public/images/products/${file.filename}`
      );
      await sharp(file.path)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(filePath);
    })
  );
  next();
};

const blogImgResize = async (req, res, next) => {
  if (!req.files) {
    return next();
  }
  await Promise.all(
    req.files.map(async (file) => {
      const filePath = path.join(
        __dirname,
        `public/images/products/${file.filename}`
      );
      await sharp(file.path)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(filePath);
    })
  );
  next();
};

module.exports = { uploadPhoto, productImgResize, blogImgResize };
