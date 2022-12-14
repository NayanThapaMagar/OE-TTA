const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// requiring routers
// const cors = require("cors");
const router = require('./src/routes/index');
const authrouter = require('./src/routes/auth');

// setting up our app
const app = express();
const port = 4000;

// setting up cors
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

// create application/json parser
app.use(express.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

// route configure
app.use('/api', router);
app.use('/auth', authrouter);
// server start
app.listen(port, () => console.log('server at ', port));
