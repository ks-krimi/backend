require("dotenv").config({ path: "./.env" });
require("./config/db_conf");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { graphqlHTTP } = require("express-graphql");
const { checkUser, requireAuth } = require("./middlewares/auth.middleware");
const userRoutes = require("./routes/user.routes");
const schema = require("./schemas");

// initialise a new express app
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

// use cors middleware
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));

// auths middlewares
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// routes
app.use("/api/user", userRoutes);

app.use("/graphql", (req, res) => {
  graphqlHTTP({
    schema,
    graphiql: false,
    context: { req },
    customFormatErrorFn: (err) => {
      return {
        message: err.message,
        name: err.name,
        extensions: err.extensions,
      };
    },
  })(req, res);
});

// server
const server = app.listen(process.env.PORT, () => {
  console.log(`Le serveur est écouté sur le port: ${process.env.PORT}`);
});

// handle when there has an error
process.on("unhandledRejection", (err, promise) => {
  console.log(`Il a ces erreurs : ${err}`);
  server.close(() => process.exit(1));
});
