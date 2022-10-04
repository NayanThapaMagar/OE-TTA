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

  // getting datas(user name, email, contact, password) form body or frontend
  const {
    userName,
    fullName,
    address,
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
    || !address
    || !contact
    || !email
    || !role
    || !password
    || !confirmPassword
  ) {
    return res.send({ registration: false, message: 'All fields not provided' });
  }
  // authorization validation
  // not authorizing manager to add another manager
  if (req.user.role === 'MNGR-102' && role === 'MNGR-102') {
    return res.send({ registration: false, message: 'User is not authorizedd' });
  }
  // role validation
  if (role !== 'MNGR-102' && role !== 'EMPY-103') {
    return res.send({ registration: false, message: 'Invalid Role' });
  }
  // password validation
  if (password !== confirmPassword) {
    return res.send({ registration: false, message: "Password doesn't match" });
  }
  // contact validation
  if (!valid.contact(contact)) {
    return res.send({ registration: false, message: 'Invalid owner contact' });
  }
  // getting access token from headers
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  await UserRegister.findOne({
    $and: [
      {
        $or: [
          { Contact: contact },
          { User_Name: userName }],
      },
      {
        $or: [
          { Role: 'MNGR-102' },
          { Role: 'EMPY-103' }],
      },
    ],
  }).then(async (result) => {
    if (result === null) {
      // hassing password and adding salt to it
      const hashedPassword = await bcrypt.hash(password, 10);
      const NewUserRegister = new UserRegister({
        Full_Name: fullName,
        User_Name: userName,
        Address: address,
        Contact: contact,
        Email: email,
        Role: role,
        Password: hashedPassword,
        Company_Obj_Id: decoded.companyObjId,
      });
      await NewUserRegister.save()
        .then(() => res.send({ registration: true, message: 'User Registered Successfully' }))
        .catch((err) => res.send({ error: err, registration: false, message: 'Failed to register!' }));
    } else {
      return res.send({ registration: false, message: `Contact: ${contact} or username: ${userName} is already occupied by ${result.Full_Name}` });
    }
    return 0;
  })
    .catch(() => res.send({ registration: false, message: 'Failed to register!' }));

  return 0;
};
