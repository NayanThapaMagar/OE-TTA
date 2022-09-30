const mongoose = require('mongoose');

const { Schema } = mongoose;

// creating a schema for registering
const registerSchema = new Schema(
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
    Email: {
      type: String,
      requires: true,
    },
    Max_Number_Of_Employee: {
      type: Number,
      requires: true,
    },
    Company_Code: {
      type: String,
      requires: true,
    },
  },
  { timestamps: true },
);

// wrapping registering schema in an object
const Register = mongoose.model('Register', registerSchema);

// exporting registering schema
module.exports = Register;
