const mongoose = require('mongoose');

const { Schema } = mongoose;

// creating a schema for registering
const userRegisterSchema = new Schema(
  {
    Full_Name: {
      type: String,
      required: true,
    },
    User_Name: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    Contact: {
      type: String,
      unique: true,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Role: {
      type: String,
      enum: ['OWNER101', 'MANAGER102', 'EMPLOYEE103'],
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Company_Obj_Id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// wrapping registering schema in an object
const UserRegister = mongoose.model('UserRegister', userRegisterSchema);

// exporting registering schema
module.exports = UserRegister;
