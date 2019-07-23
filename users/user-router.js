const express = require("express");
const bcrypt = require("bcryptjs");

const Users = require("./user-model");
const authenticate = require("../auth/authenticate");

const router = express.Router();

router.post("/register", (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.username = user.username; //<<<<<<<<<

        res.status(200).json({ message: "Logged in" });
      } else {
        res.status(401).json({ message: "you shall not pass!" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/users", authenticate, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ message: "you can checkout but can't leave" });
      } else {
        res.status(200).json({ mesage: "bye....." });
      }
    });
  } else {
    res.status(200).json({ message: "peace bro" });
  }
});

module.exports = router;
