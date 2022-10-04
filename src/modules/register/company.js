const mongoose = require('mongoose');

const { Schema } = mongoose;

// creating a schema for registering
const companyRegisterSchema = new Schema(
  {
    Company_Name: {
      type: String,
      required: true,
    },
    Country: {
      type: String,
      required: true,
    },
    Company_Address: {
      type: String,
      required: true,
    },
    Company_Contact: {
      type: String,
      required: true,
    },
    Max_Number_Of_Employee: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

// wrapping registering schema in an object
const CompanyRegister = mongoose.model('CompanyRegister', companyRegisterSchema);
// client.db('registration').collection('company');

// exporting registering schema
module.exports = CompanyRegister;
