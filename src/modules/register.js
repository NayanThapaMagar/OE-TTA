const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creating a schema for registering
const registerSchema = new Schema(
  {
    UserName: {
      type: String,
      requires: true,
    },
    Contact: {
      type: String,
      requires: false,
    },
    Email: {
      type: String,
      requires: false,
    },
    Password: {
      type: String,
      requires: true,
    },
    RoleCode: {
      type: String,
      enum: ["555","666", "777"],
      requires: true,
    },
  },
  { timestamps: true }
);

// wrapping registering schema in an object
const Register = mongoose.model("Register", registerSchema);

// exporting registering schema
module.exports = Register;