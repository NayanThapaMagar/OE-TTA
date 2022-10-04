// // requiring bcrypt for password encryption
const bcrypt = require('bcrypt');

// requiring database connection
// const Transaction = require('mongoose-transactions');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const mongo = require('../../../config/database');

// requiring register schema
const UserRegister = require('../../../modules/register/user');
const valid = require('../../../utils/validation');

// CompanyObjId:

module.exports = async (req, res) => {
  // connectiong to database
  await mongo();

  // getting access token from headers
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  // getting datas(user name, email, contact, password) form body or frontend
  const {
    userName,
    fullName,
    contact,
    email,
    role,
    password,
    confirmPassword,
  } = req.body;
  // checking if fields are null
  if (
    !userName
    || !fullName
    || !contact
    || !email
    || !role
    || !password
    || !confirmPassword
  ) {
    return res.send({ registration: false, message: 'All fields not provided' });
  }
  // password validation
  if (password !== confirmPassword) {
    return res.send({ registration: false, message: "Password doesn't match" });
  }
  // contact validation
  if (!valid.contact(contact)) {
    return res.send({ registration: false, message: 'Invalid owner contact' });
  }

  // hassing password and adding salt to it
  const hashedPassword = await bcrypt.hash(password, 10);
  const NewUserRegister = new UserRegister({
    Full_Name: fullName,
    User_Name: userName,
    Contact: contact,
    Email: email,
    Role: role,
    Password: hashedPassword,
    Company_Obj_Id: decoded.companyObjId,
  });
  await NewUserRegister.save().then(() => { res.send({ registration: true, message: 'User Registered Successfully' }); }).catch(() => res.send({ registration: false, message: 'Failed to register!' }));
  return 0;
};
