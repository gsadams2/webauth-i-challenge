const db = require("../data/db-config");

module.exports = {
  add,
  findBy,
  find,
  findById
};

function findBy(username) {
  return db("users").where(username);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function find() {
  return db("users").select("id", "username", "password");
}
