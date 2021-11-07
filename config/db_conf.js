const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/" + process.env.DB_NAME,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err)
      console.log("Mongodb connected: DB NAME = " + process.env.DB_NAME);
    else console.log("Connetion error : " + err);
  }
);
