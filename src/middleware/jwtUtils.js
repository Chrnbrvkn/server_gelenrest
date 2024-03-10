const jwt = require('jsonwebtoken');
const JWT_EXPIRATION = process.env.JWT_EXPIRATION
const JWT_SECRET = process.env.JWT_SECRET

const generateToken = (user) => {
  console.log('jwtUtils.js ' + JSON.stringify(user));
  return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

module.exports = { generateToken };
