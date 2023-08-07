const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  //Nous créons une constante storage , à passer à multer comme configuration, qui contient la logique nécessaire pour indiquer à multer où enregistrer les fichiers entrants
  destination: (req, file, callback) => {
    // indique dans quels fichiers on enregistre les fichiers
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_"); //indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores 
    const extension = MIME_TYPES[file.mimetype]; //genère une extension aux fichiers
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage }).single("image"); //exportons ensuite l'élément multer entièrement configuré, lui passons notre constante storage et lui indiquons que nous gérerons uniquement les téléchargements de fichiers image.
