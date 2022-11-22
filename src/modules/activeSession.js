const mongoose = require('mongoose');

const { Schema } = mongoose;

// creating a schema for registering
const activeSession = new Schema(
  {
    UserId: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      required: true,
    },
    StartAt: {
      type: Date,
      required: false,
    },
    EndAt: {
      type: Date,
      required: false,
    },
    TotalTime: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true },
);

// wrapping registering schema in an object
const ActiveSession = mongoose.model('ActiveSession', activeSession);

// exporting registering schema
module.exports = ActiveSession;
