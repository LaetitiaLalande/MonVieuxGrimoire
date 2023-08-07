const express = require("express");
const mongoose = require("mongoose");

const booksRoutes = require("./routes/books");
const userRoutes = require("./routes/user");

const path = require("path");

mongoose
  .connect(
    "mongodb+srv://laetitia2288:Olivier2288@cluster0.kposlpk.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use(express.json()); // prend toutes les requêtes qui ont comme Content-Type  application/json  et met à disposition leur  body  directement sur l'objet req

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //permet d'accéder à notre API depuis n'importe quelle origine ( '*' )
  res.setHeader(
    //permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.)
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    //permet d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.)
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/books", booksRoutes); // endpoint visé par l'api
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
