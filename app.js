const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const booksRoutes = require("./routes/books");
const userRoutes = require("./routes/user");

mongoose
  .connect(
    "mongodb+srv://laetitia2288:Olivier2288@cluster0.kposlpk.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use("/api/books", booksRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
