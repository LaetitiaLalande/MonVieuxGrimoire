const Book = require("../models/Book");
const fs = require("fs");

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  book
    .save()
    .then(() => { res.status(201).json({ message: "Objet enregistré !" }); })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

exports.modifyBook = (req, res, next) => {
  const bookObject = req.file
    ?
    {
      ...JSON.parse(req.body.book),
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    }
    : { ...req.body };
  delete bookObject._userId;
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId !== req.auth.userId) {
        res.status(403).json({ message: "Requête non autorisée" });
      }
      else {
        Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet modifié!" }))
          .catch((error) => {
            console.log(error);
            res.status(401).json({ error });
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId !== req.auth.userId) {
        res.status(403).json({ message: "Requête non autorisée" });
      } else {
        const filename = book.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            });
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

exports.addRating = (req, res, next) => {
  const { rating } = req.body;
  const newRating = {
    userId: req.auth.userId,
    grade: rating,
  };
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book) {
        const userHasVoted = book.ratings.some((rating) => rating.userId === req.auth.userId);
        if (!userHasVoted) {
          book.ratings.push(newRating);
          const sumRatings = book.ratings.reduce((sum, rating) => sum + rating.grade, 0);
          book.averageRating = sumRatings / book.ratings.length;
          book.averageRating = parseFloat(book.averageRating.toFixed(2));
          book.save()
            .then((book) => res.status(200).json(book));
        } else {
          return res.status(400).json({ error: "L'utilisateur a déjà voté" });
        }
      } else {
        return res.status(404).json({ error: "Livre non trouvé" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

exports.getBestRating = (req, res, next) => {
  Book.find()
    .then((books) => {
      books.sort((a, b) => b.averageRating - a.averageRating);
      const bestRating = books.slice(0, 3);
      res.status(200).json(bestRating);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ error });
    });
};

exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => {
      console.log(error);
      res.status(404).json({ error });
    });
};

exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => {
      console.log(error);
      res.status(404).json({ error });
    });
};
