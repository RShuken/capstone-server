const jwt = require('jsonwebtoken');
const UsersService = require('./users/users-service');

const createAccessToken = (payload) => {
  return jwt.sign(payload, 'idunno123', { // process.env.ACCESS_TOKEN_SECRET
    algorithm: 'HS256',
    expiresIn: 60*60, // process.env.ACCESS_TOKEN_EXPIRY
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, 'iamwhatiam', { // process.env.REFRESH_TOKEN_SECRET
    algorithm: 'HS256',
    expiresIn: 60*60, //process.env.REFRESH_TOKEN_EXPIRY
  });
};

const verifyAuthTokens = async (req, res, next) => {
  let accessToken =
    req.headers['authorization'] || req.cookies['authorization'];
  let userId = req.headers['user-id'];
  if (!accessToken) {
    return res.status(403).json({ msg: 'Access token is missing' });
  }

  let payload = null;
  try {
    payload = jwt.verify(accessToken, 'idunno123'); //process.env.ACCESS_TOKEN_SECRET
    const userAccount = await UsersService.getById(
      req.app.get('db'),
      parseInt(userId)
    ).then((data) => data);
    req.session.user = userAccount;
    next();
  } catch (e) {
    console.log(e);
    res.status(403).send();
  }
};

module.exports = {
  verifyAuthTokens,
  createRefreshToken,
  createAccessToken,
};
