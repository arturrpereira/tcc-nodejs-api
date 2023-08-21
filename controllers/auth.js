const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json'));
const apiKey = config.riotKey;

const { validationResult } = require('express-validator');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Falha na autenticação do usuário!');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const riotName = encodeURIComponent(req.body.riotName);
  try {
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
    res.status(201).json(data);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'Usuário encontrado!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
