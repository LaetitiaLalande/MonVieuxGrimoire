// const multer = require("multer");

// const MIME_TYPES = {
//   "image/jpg": "jpg",
//   "image/jpeg": "jpg",
//   "image/png": "png",
// };

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "images");
//   },
//   filename: (req, file, callback) => {
//     const name = file.originalname.split(" ").join("_"); //indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores 
//     const extension = MIME_TYPES[file.mimetype]; //genère une extension aux fichiers
//     callback(null, name + Date.now() + "." + extension);
//   },
// });

// module.exports = multer({ storage }).single("image"); 