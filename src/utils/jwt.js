const jwt = require('jsonwebtoken');

const options = {
  expiresIn: '7d',
};
const secretKey = process.env.JWT_SECRET;

exports.generateJwt = (payload) => jwt.sign(payload, secretKey, options);
exports.verifyJwt = (token) => jwt.verify(token, secretKey);