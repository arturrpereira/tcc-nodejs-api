const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json'));
const apiKey = config.riotKey;

const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validação falhou!');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const nome = req.body.nome;
  const email = req.body.email;
  const login = req.body.login;
  const senha = req.body.senha;
  const dataNasc = req.body.dataNascimento;
  const riotName = encodeURIComponent(req.body.riotName);
  try {
    // Verificação se o email já foi utilizado no cadastro
    let user = await User.findOne({ email: email });
    if (user) {
      const error = new Error(
        'Usuário com esse email já foi cadastrado, verifique!',
      );
      error.statusCode = 401;
      throw error;
    }

    // Verificação se o Nick da riot já foi cadastrado
    user = await User.findOne({ riotName: riotName });
    if (user) {
      const error = new Error(
        'Usuário com esse nick já foi cadastrado, verifique!',
      );
      error.statusCode = 401;
      throw error;
    }

    const response = await fetch(
      'https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' +
        riotName,
      {
        method: 'GET',
        headers: {
          'X-Riot-Token': apiKey,
        },
      },
    );
    if (!response.ok) {
      const error = new Error(
        'Nome de invocador não encontrado nos servidores Riot Games!',
      );
      error.statusCode = 404;
      throw error;
    }
    const data = await response.json();

    // res.status(201).json(data);
    user = new User({
      nome: nome,
      email: email,
      login: login,
      senha: senha,
      dataNascimento: dataNasc,
      riotName: riotName,
    });
    const result = await user.save();
    res
      .status(201)
      .json({ message: 'Usuário cadastrado com sucesso!', userId: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const login = req.body.login;
  const senha = req.body.senha;
  let loadedUser;
  try {
    const user = await User.findOne({ login: login });
    if (!user) {
      const error = new Error('Um usuário com esse email não foi encontrado!');
      error.statusCode = 401;
      throw error;
    }
    if (senha != user.senha) {
      const error = new Error('Senha incorreta!');
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    res.status(200).json({ userId: loadedUser._id.toString() });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
