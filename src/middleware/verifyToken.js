const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];

  console.log('VERIFY TOKEN: ' + token);
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  console.log('VERIFY TOKEN: ' + token);

  if (!token) {
    return res.status(403).json({
      message: `Forbidden!`,
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: `Не удалось аутентифицировать токен. \n${err}`,
      });
    }

    console.log('VERIFY TOKEN decoded: ' + decoded);
    console.log(JSON.stringify(decoded));
    // Токен действителен, сохраняем декодированные данные в запросе для использования в следующих middleware
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };