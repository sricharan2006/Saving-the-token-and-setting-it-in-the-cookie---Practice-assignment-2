const jwt = require('jsonwebtoken');

const encrypt = (payload, secret) => {
  
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  return token;
};

module.exports = { encrypt };
