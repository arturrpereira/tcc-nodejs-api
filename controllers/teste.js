exports.getTeste = async (req, res, next) => {
  res.status(200).json({
    nick: 'Dummy Nick',
    match: 'Dummy Match',
    message: 'Usuário teste, recuperado com sucesso!',
  });
};

exports.postTeste = async (req, res, next) => {
  res.status(200).json({
    message: 'Teste efetuado com sucesso!',
  });
};

exports.putTeste = async (req, res, next) => {
  res.status(200).json({
    message: 'Teste atualizado com sucesso!',
  });
};

exports.deleteTeste = async (req, res, next) => {
  res.status(200).json({
    message: 'Teste deletado com sucesso!',
  });
};
