// // requiring bcrypt for password encryption
const bcrypt = require('bcrypt');

// requiring database connection
const mongo = require('../../../config/database');

// requiring register schema
const Register = require('../../../modules/register/company');
const valid = require('../../../utils/validation');

module.exports = async (req, res) => {
  // connectiong to database
  await mongo();

  // getting datas(user name, email, contact, password) form body or frontend
  const {
    userName, email, contact, password, confirmPassword,
  } = req.body;
  // checking if fields are null
  if (!userName || !email || !contact || !password || !confirmPassword) { return res.send({ register: false, message: 'All fields not provided' }); }
  // password validation
  if (password !== confirmPassword) { return res.send({ register: false, message: "Password doesn't match" }); }
  // contact validation
  // console.log(valid.contact(contact));
  if (!valid.contact(contact)) { return res.send({ register: false, message: 'Invalid contact' }); }
  // checking if the root user is already registered
  if (await Register.findOne({ RoleCode: '777' })) {
    // root user alresdy registered
    // redirecting to login page
    // res.status(401).sendFile(path.join(__dirname, "login.html"));
    res
      .status(401)
      .send({ register: false, message: 'User is already reqistered' });
  } else {
    // root user not registered before

    // hassing password and adding salt to it
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating an instance of register schema
    const register = new Register({
      UserName: userName,
      Contact: contact,
      Email: email,
      Password: hashedPassword,
      RoleCode: '777', // assigning default value 777
    });

    // adding new instance to the database(registering new user)
    await register
      .save()
      .then(() => {
        // user register success
        res.json({ register: true, message: 'User Registered' });
      })
      .catch((err) => {
        res.send({
          register: false,
          message: 'Failed to register root user',
          reason: err,
        });
      });
  }
  return 0;
};
