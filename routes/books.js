const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const upload = require("../middleware/optimisationImage");

const booksControllers = require("../controllers/books");

router.get("/", booksControllers.getAllBooks);
router.post("/", auth, upload, booksControllers.createBook);
router.post("/:id/rating", auth, booksControllers.addRating);
router.get("/bestrating", booksControllers.getBestRating)
router.get("/:id", booksControllers.getOneBook);
router.put("/:id", auth, upload, booksControllers.modifyBook);
router.delete("/:id", auth, booksControllers.deleteBook);

module.exports = router;

