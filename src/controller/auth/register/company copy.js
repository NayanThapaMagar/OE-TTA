// // requiring bcrypt for password encryption
const bcrypt = require('bcrypt');

// requiring database connection
const Transaction = require('mongoose-transactions');
const mongo = require('../../../config/database');

// requiring register schema
const CompanyRegister = require('../../../modules/register/company');
const valid = require('../../../utils/validation');

// CompanyObjId:

module.exports = async (req, res) => {
  // connectiong to database
  await mongo();

  // getting datas(user name, email, contact, password) form body or frontend
  const {
    companyName,
    country,
    address,
    companyContact,
    maxNumberOfEmployee,
    userName,
    companyOwnerName,
    owonerContact,
    email,
    role,
    password,
    confirmPassword,
  } = req.body;
  // checking if fields are null
  if (
    !companyName
    || !country
    || !address
    || !companyContact
    || !maxNumberOfEmployee
    || !userName
    || !companyOwnerName
    || !owonerContact
    || !email
    || !role
    || !password
    || !confirmPassword
  ) {
    return res.send({ register: false, message: 'All fields not provided' });
  }
  // password validation
  if (password !== confirmPassword) {
    return res.send({ register: false, message: "Password doesn't match" });
  }
  // contact validation
  // console.log(valid.contact(contact));
  // console.log(valid.contact(companyContact));
  if (!valid.contact(companyContact)) {
    return res.send({ register: false, message: 'Invalid company contact' });
  }
  if (!valid.contact(owonerContact)) {
    return res.send({ register: false, message: 'Invalid owner contact' });
  }

  // hassing password and adding salt to it
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  // creating an instance of register schema
  const companyRegister = new CompanyRegister({
    Company_Name: companyName,
    Country: country,
    Address: address,
    Company_Contact: companyContact,
    Max_Number_Of_Employee: maxNumberOfEmployee,
  });
  // let companyRegister = mongoose.model('companyRegister', companyRegister);
  // await companyRegister
  //   .save()
  //   .then((result) => {
  //     console.log(result);
  //     res.send({ register: true, message: 'Company Registered' });
  //   })
  //   .catch((err) => {
  //     res.send({
  //       error: err,
  //       register: false,
  //       message: 'Registration Faied!',
  //     });
  //   });
  // const companyRegister = {
  //   Company_Name: companyName,
  //   Country: country,
  //   Address: address,
  //   Company_Contact: companyContact,
  //   Max_Number_Of_Employee: maxNumberOfEmployee,
  // };

  const useDB = true;
  const transaction = new Transaction(useDB);
  const person = 'CompanyRegister';

  async function start() {
    // create operation on transaction instance
    const id = transaction.insert(person, companyRegister);
    console.log(id);
    // transaction.update(person, id, nicolaObject, { new: true });

    // get and save created operation,
    // saveOperations method  return the transaction id saved on database
    // const operations = transaction.getOperations();
    // console.log(operations);
    // const transId = await transaction.saveOperations();

    // create a new transaction instance
    const newTransaction = new Transaction(true);

    // load the saved operations in the new transaction instance using the transId
    // await newTransaction.loadDbTransaction(transId);

    // if you need you can get the operations object
    // const newOperations = newTransaction.getOperations();

    // finally run and rollback
    try {
      const final = await newTransaction.run();
      console.log(final);
    } catch (err) {
      const rolled = await newTransaction.rollback();
      console.log(rolled);
    }
  }

  start();
  return 0;
};
