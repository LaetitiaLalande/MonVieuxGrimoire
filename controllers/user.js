const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.signup = (req, res, next) => {
  // fction qui crypte le mdp qui va prednre ce mdp crypte pour créer un user avce mdp crypté + email passé dans coprs de la reqeuet
  // fonction d'enreigistrement user
  bcrypt
    .hash(req.body.password, 10) // crypte le mdp de la req
    .then((hash) => {
      const user = new User({
        // creation du nouvel user
        email: req.body.email, // on utlise l email du coprs de la req
        password: hash, // on utilise le mdp crypté
      });
      user // creation du user dans la base de données
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  // fction pour connecter les users
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        // si user n'existe pas ds la base de données
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      } else {
        bcrypt
          .compare(req.body.password, user.password) // compare le mdp transmis par le client avce celui present dan sla base de donnée
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ error: "Mot de passe incorrect !" });
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                  { userId: user._id },
                  "RANDOM_TOKEN_SECRET", //Nous utilisons une chaîne secrète de développement temporaire RANDOM_SECRET_KEY pour crypter notre token
                  //la fonction sign de jsonwebtoken pour chiffrer un nouveau token. Ce token contient l'ID de l'utilisateur en tant que payload
                  { expiresIn: "24h" } //Nous définissons la durée de validité du token à 24 heures. L'utilisateur devra donc se reconnecter au bout de 24 heures.
                ),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
