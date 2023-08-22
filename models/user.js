const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  dataNascimento: {
    type: Date,
    required: true,
  },
  riotName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
