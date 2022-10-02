// requiring and configuring .env files
require('dotenv').config();
// // reuiring jwt token
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // getting access token from headers
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  //   const token = authHeader && authHeader.split(' ')[1];

  // checking if access token is null
  if (token == null) return res.send({ requestAccess: false, message: 'Access Denied' });
  // verifying access token
  // eslint-disable-next-line consistent-return
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.send({ requestAccess: false, message: 'Access Denied' });
    req.user = user;
    // authorization success
    next();
  });
  return 0;
};
