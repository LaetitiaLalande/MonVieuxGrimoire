const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const booksControllers = require("../controllers/books");

router.get("/", booksControllers.getAllBooks);
router.post("/", auth, booksControllers.createBook);
router.put("/:id", auth, booksControllers.modifyBook);
router.delete("/:id", auth, booksControllers.deleteBook);
router.get("/:id", auth, booksControllers.getOneBook);

module.exports = router;
