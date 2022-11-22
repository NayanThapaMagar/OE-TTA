const mongoose = require('mongoose');

const { Schema } = mongoose;

// creating a schema for registering
const timeSheet = new Schema(
  {
    UserId: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      required: true,
    },
    StartedAt: {
      type: Date,
      required: true,
    },
    EndedAt: {
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
const TimeSheet = mongoose.model('TimeSheet', timeSheet);

// exporting registering schema
module.exports = TimeSheet;
