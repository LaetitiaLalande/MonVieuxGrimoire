const multer = require("multer")
const SharpMulter = require("sharp-multer");

const storage =
    SharpMulter({
        destination: (req, file, callback) => callback(null, "images"),
        imageOptions: {
            fileFormat: "webp",
            quality: 100,
            resize: { width: 600, height: 600 },
        }
    });

const upload = multer({ storage }).single("image");

module.exports = upload;
