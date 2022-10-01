const mongoose = require('mongoose');

const { Schema } = mongoose;

// creating a schema for registering
const userRegisterSchema = new Schema(
  {
    Full_Name: {
      type: String,
      requires: true,
    },
    User_Name: {
      type: String,
      requires: true,
    },
    Address: {
      type: String,
      requires: true,
    },
    Contact: {
      type: String,
      requires: true,
    },
    Email: {
      type: String,
      requires: true,
    },
    Role: {
      type: String,
      requires: true,
    },
    Password: {
      type: String,
      requires: true,
    },
    Company_Obj_Id: {
      type: String,
      requires: true,
    },
  },
  { timestamps: true },
);

// wrapping registering schema in an object
const UserRegister = mongoose.model('UserRegister', userRegisterSchema);

// exporting registering schema
module.exports = UserRegister;
