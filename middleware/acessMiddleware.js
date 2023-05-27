// linha de seguranaca entre front-back
const config = require('../config/secret');

async function accessMiddleware(req, res, next) {
  const accessHeader = req.header('Access');

  if (!accessHeader) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  try {
    if (accessHeader !== config.access) {
      throw new Error('Token inválido');
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Sem autorização' });
  }
}

module.exports = accessMiddleware;