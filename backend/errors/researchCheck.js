const NotFoundError = require('./notFoundError');

function resCheck(res) {
  if (res === null) {
    throw new NotFoundError('Пользователь с указанным _id не найден');
  }
  return res;
}

module.exports = { resCheck };
