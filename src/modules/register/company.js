const mongoose = require('mongoose');

const { Schema } = mongoose;

// creating a schema for registering
const companyRegisterSchema = new Schema(
  {
    Company_Name: {
      type: String,
      requires: true,
    },
    Country: {
      type: String,
      requires: true,
    },
    Address: {
      type: String,
      requires: true,
    },
    Company_Contact: {
      type: String,
      requires: true,
    },
    Max_Number_Of_Employee: {
      type: Number,
      requires: true,
    },
  },
  { timestamps: true },
);

// wrapping registering schema in an object
const CompanyRegister = mongoose.model('CompanyRegister', companyRegisterSchema);
// client.db('registration').collection('company');

// exporting registering schema
module.exports = CompanyRegister;
