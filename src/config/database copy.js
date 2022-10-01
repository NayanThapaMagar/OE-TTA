// const mongoose = require("mongoose");
// const MongoClient = require('mongodb');
const { MongoClient } = require('mongodb');

// requiring and configuring .env files
require('dotenv').config();

module.exports = async (req, res) => {
  // Connection URI
  const url = process.env.DB_URI;

  // or as an es module:
  // import { MongoClient } from 'mongodb'

  // Connection URL
  const client = new MongoClient(url);

  // Database Name
  // const dbName = 'OE-TTA';

  async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    // const db = client.db(dbName);
    // const collection = db.collection('documents');
    // console.log(collection);

    // the following code examples can be pasted here...

    // return 'done.';
  }

  const mongo = main()
    // .then()
    .catch(() => res.send({
      databaseConnection: false,
      message: 'Failed to connect to database',
    }))
    .finally(() => client.close());
  return mongo;
};
