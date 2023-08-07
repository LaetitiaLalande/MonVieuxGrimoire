const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => { // fction qi vérifie qu ele token est valide pour le transmettre aux routes
  try {
    const token = req.headers.authorization.split(" ")[1]; //recupere le token. Nous utilisons donc la fonction split pour tout récupérer après l'espace dans le header
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); //verify pour décoder notre token. Si celui-ci n'est pas valide, une erreur sera générée.
    const userId = decodedToken.userId; //Nous extrayons l'ID utilisateur de notre token et le rajoutons à l’objet Request afin que nos différentes routes puissent l’exploiter.
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
};
