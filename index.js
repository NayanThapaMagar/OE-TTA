//importing files
const express = require("express");
// const cors = require("cors");

// requiring routers
// const router = require("./src/routes/index");
const authrouter = require("./src/routes/auth");

//setting up our app
const app = express();
const port = 3000;

// //setting up cors
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

// create application/json parser
app.use(express.json());

//route configure
// app.use("/api", router);
app.use("/auth", authrouter);

//server start
app.listen(port, () => console.log("server at ", port));