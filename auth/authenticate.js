const bcrypt = require("bcryptjs"); // <<<<<<<< install it and require it
const Users = require("../users/user-model");

module.exports = authenticate;

function authenticate(req, res, next) {
  const { username, password } = req.headers;
  console.log(username, password);
  // find the users in the DB
  Users.findBy({ username })
    .first() //// we do this because findBy returns an array
    .then(user => {
      console.log(user);

      // check the credentials
      if (user && bcrypt.compareSync(password, user.password)) {
        next(); // pressing the button to let the request continue
      } else {
        res.status(401).json({ message: "you shall not pass" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
}
