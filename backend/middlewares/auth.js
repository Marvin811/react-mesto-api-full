const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const secret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

    if (!token) throw new UnauthorizedError('Необходима авторизация');

    const payload = jwt.verify(token, secret);

    if (!payload) throw new UnauthorizedError('Необходима авторизация');

    req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
};
