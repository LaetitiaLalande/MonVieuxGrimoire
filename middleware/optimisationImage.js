const multer = require("multer")
const SharpMulter = require("sharp-multer");


const filenameFunction = (og_filename, options) => {
    const newName =
        og_filename.split(".").slice(0, -1).join(".") + "-" + Date.now() + "." + options.fileFormat;
    return newName
};

const storage =
    SharpMulter({
        destination: (req, file, callback) => callback(null, "images"),
        imageOptions: {
            fileFormat: "webp",
            quality: 90,
            resize: { width: 600, height: 600 },
        },
        filename: filenameFunction,
    });

const uploadAndOptimisation = multer({ storage }).single("image");

module.exports = uploadAndOptimisation;
