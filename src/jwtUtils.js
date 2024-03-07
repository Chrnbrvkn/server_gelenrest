const jwt = require('jsonwebtoken');
const JWT_EXPIRATION = process.env.JWT_EXPIRATION
const JWT_SECRET = process.env.JWT_SECRET

const generateToken = (user) => {
  return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

// Функция верификации токена, если понадобится
const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
