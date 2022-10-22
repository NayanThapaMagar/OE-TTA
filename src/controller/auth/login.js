// requiring bcrypt for password encryption
const bcrypt = require('bcrypt');

// requiring jwt token
const jwt = require('jsonwebtoken');
// requiring database connection
const mongo = require('../../config/database');

// requiring register schema
const User = require('../../modules/register/user');

// requiring and configuring .env files
require('dotenv').config();

module.exports = async (req, res) => {
  // connecting to database
  await mongo();

  // getting username and password form frontend i.e. body
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(401).send({
      login: false,
      message: 'Username or password not provided',
    });
  }
  let user;
  let userId = null;
  // console.log(user);
  // finding for user with provided userName
  await User.findOne({ User_Name: userName })
    .then(async (result) => {
      // assigning the result value to user variable to check if user exists or not
      user = result;
      // eslint-disable-next-line no-underscore-dangle
      userId = user._id;
      try {
        // checking if user exists or not
        if (!user) {
          // user doesn't exist
          return res.status(401).send({ message: 'Incorrect Username' });
        }
        // user exists
        // checking if the passord is valid or not
        if (await bcrypt.compare(password, user.Password)) {
          // password valid => login successful

          // object to create tokens
          const USER = {
            name: user.User_Name,
            contact: user.Contact,
            role: user.Role,
            companyObjId: user.Company_Obj_Id,
          };
          // generating access token
          const accessToken = jwt.sign(USER, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1000000s',
          });
          // setting access token to headers
          res.header({ Authorization: `Bearer ${accessToken}` });

          // sending response back
          return res.json({
            login: true,
            message: 'Login Successful',
            accessToken,
            _id: userId,
          });
        }
        // invalid password
        // login unsucessful
        return res.status(401).send({ message: 'Incorrect Password' });
        // redirecting to login page
      } catch {
        return res.status(401).send({
          login: false,
          message: 'Failed to login!',
        });
      }
    })
    .catch((err) => res.send({ error: err, message: 'Something went wrong Please try again latter' }));
  return 0;
};
