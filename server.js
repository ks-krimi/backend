require("dotenv").config({ path: "./.env" });
require("./config/db_conf");

const express = require("express");
const cors = require("cors");

// initialise a new express app
const app = express();

// use cors middleware
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

// server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server listen on port ${process.env.PORT}`);
});

// handle when there has an error
process.on("unhandledRejection", (err, promise) => {
  console.log(`Il a ces erreurs : ${err}`);
  server.close(() => process.exit(1));
});
