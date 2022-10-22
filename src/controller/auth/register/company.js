// // requiring bcrypt for password encryption
const bcrypt = require('bcrypt');
// const validator = require('validator');
const { MongoClient } = require('mongodb');

// requiring database connection
// const Transaction = require('mongoose-transactions');
require('dotenv').config();

const mongo = require('../../../config/database');

const uri = process.env.DB_URI;
const client = new MongoClient(uri);

// requiring register schema
// const CompanyRegister = require('../../../modules/register/company');
const UserRegister = require('../../../modules/register/user');
const valid = require('../../../utils/validation'); // if valid returns ture

// CompanyObjId:

module.exports = async (req, res) => {
  // connectiong to database
  await mongo();

  // getting datas(user name, email, contact, password) form body or frontend
  const {
    companyName,
    country,
    companyAddress,
    companyContact,
    maxNumberOfEmployee,
    userName,
    companyOwnerName,
    ownerContact,
    ownerAddress,
    email,
    role,
    password,
    confirmPassword,
  } = req.body;
  // checking if fields are null
  if (
    !companyName
    || !country
    || !companyAddress
    || !companyContact
    || !maxNumberOfEmployee
    || !userName
    || !companyOwnerName
    || !ownerContact
    || !ownerAddress
    || !email
    || !role
    || !password
    || !confirmPassword
  ) {
    return res.send({ registration: false, message: 'All fields not provided' });
  }
  // role validation
  if (role !== 'ONR-101' && role !== 'MNGR-102' && role !== 'EMPY-103') {
    return res.send({ registration: false, message: 'Invalid Role' });
  }
  // password validation
  if (password !== confirmPassword) {
    return res.send({ registration: false, message: "Password doesn't match" });
  }
  // contact validation
  if (!valid.contact(companyContact)) {
    return res.send({ registration: false, message: 'Invalid company contact' });
  }
  if (!valid.contact(ownerContact)) {
    return res.send({ registration: false, message: 'Invalid owner contact' });
  }
  // email validation
  if (!valid.emailExists(email)) {
    return res.send({ registration: false, message: 'Invalid email' });
  }

  // hassing password and adding salt to it
  const hashedPassword = await bcrypt.hash(password, 10);

  async function start() {
    const companyCollection = client.db('test').collection('companyregisters');
    const userCollection = client.db('test').collection('userregisters');
    // console.log(companyColasslection);
    // Step 1: Start a Client Session
    const session = client.startSession();
    // Step 2: Optional. Define options for the transaction
    const transactionOptions = {
      readPreference: 'primary',
      readConcern: { level: 'local' },
      writeConcern: { w: 'majority' },
    };
    try {
      const transactionResults = await session.withTransaction(async () => {
        // const companyRegister = new CompanyRegister({
        //   Company_Name: companyName,
        //   Country: country,
        //   Address: address,
        //   Company_Contact: companyContact,
        //   Max_Number_Of_Employee: maxNumberOfEmployee,
        // });
        // // console.log(companyRegister);
        // const userRegister = new UserRegister({
        // Full_Name: companyOwnerName,
        // User_Name: userName,
        // Address: address,
        // Contact: ownerContact,
        // Email: email,
        // Role: role,
        // Password: hashedPassword,
        // // eslint-disable-next-line no-underscore-dangle
        // Company_Obj_Id: companyRegister._id,
        // });
        const companyAddedResults = await companyCollection.insertOne(
          {
            Company_Name: companyName,
            Country: country,
            Company_Address: companyAddress,
            Company_Contact: companyContact,
            Max_Number_Of_Employee: maxNumberOfEmployee,
          },
          { session },
        );
        await userCollection.insertOne(
          {
            Full_Name: companyOwnerName,
            User_Name: userName,
            Address: ownerAddress,
            Contact: ownerContact,
            Email: email,
            Role: role,
            Password: hashedPassword,
            Company_Obj_Id: companyAddedResults.insertedId,
          },
          { session },
        );
        // await companyRegister.save({ session });
        // await userRegister.save({ session });
        // const companyAddedResults = await companyRegister.save({ session });
        // console.log(companyAddedResults);
      }, transactionOptions);
      await session.endSession();
      return res.send(transactionResults);
    } catch (err) {
      return res.send({
        transaction: false,
        error: err,
      });
    }
  }
  await UserRegister.findOne({
    $and: [
      {
        $or: [
          { Contact: ownerContact },
          { User_Name: userName }],
      },
      { Role: 'ONR-101' },
    ],
  }).then(async (result) => {
    if (result === null) {
      start();
    } else {
      return res.send({ registration: false, message: `Contact: ${ownerContact} or username: ${userName} is already occupied by ${result.Full_Name}` });
    }
    return 0;
  })
    .catch(() => res.send({ registration: false, message: 'Failed to register!' }));
  // refrence https://github.com/mongodb-developer/nodejs-quickstart/blob/39ad5b3e6f0aa4c7242211ab0d3991ee5de9b0ea/transaction.js#L139
  return 0;
};
