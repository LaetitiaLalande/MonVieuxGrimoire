const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  id: { type: String, required: true },
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  genre: { type: String, required: true },
});

module.exports = mongoose.model("Book", bookSchema);
