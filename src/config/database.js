const mongoose = require('mongoose');
// requiring and configuring .env files
require('dotenv').config();

module.exports = async (req, res) => {
  // URI for connection to  mongobd databasae
  const dbURI = process.env.DB_URI;
  // wrapping the database connection in a variable
  // to establish batabase connecton at required places
  const mongo = await mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch(() => res.send({
      databaseConnection: false,
      message: 'Failed to connect to database',
    }));
  return mongo;
};
