const crypto = require('crypto');
const algorithm = 'aes-256-ctr';

const encrypt = (text, password) => {
  const cipher = crypto.createCipher(algorithm, password)
  let crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex');
  return crypted;
}

module.exports = {
    encrypt
}