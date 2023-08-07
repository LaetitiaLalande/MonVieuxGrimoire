const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, // impossible de s'inscire plusieurs fois avce la même adresse mail
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator); //Dans notre schéma, la valeur unique , avec l'élément mongoose-unique-validator passé comme plug-in, s'assurera que deux utilisateurs ne puissent partager la même adresse e-mail.

module.exports = mongoose.model("User", userSchema);
