const express = require("express");
const helmet = require("helmet");
// const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

module.exports = server => {
  // 2. create this configuration object
  const sessionConfig = {
    name: "cubs", // defaults to sid (which means session id)
    secret: "keep it secret, keep it safe!", // to encrypt/decrypt the cookie
    cookie: {
      maxAge: 1000 * 60 * 10, // this is in milliseconds so 10 minutes
      secure: false, // true in production, only send cookie over https
      httpOnly: true // JS can't access the cookie on the client
    },
    resave: false, // save the session again even if it didn't change
    saveUninitialized: true,
    store: new KnexSessionStore({
      // GOTCHA: ^^remember to new it up
      knex: require("./data/db-config"),
      tablename: "sessions",
      createtable: true,
      sidfieldname: "sid",
      clearInterval: 1000 * 60 * 60 // this deletes expired sessions every hour
    })
  };

  server.use(helmet());
  server.use(express.json());
  //   server.use(cors());
  server.use(session(sessionConfig)); ///// <<<< 3. turn on sessions
};
