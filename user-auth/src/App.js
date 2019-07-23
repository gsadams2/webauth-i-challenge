import React, { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

function authLogin() {
  axios
    .post("http://localhost:4000/api/login", {
      username: "danny",
      password: "hello"
    })
    .then(user => {
      console.log(user);
    })
    .catch(err => {
      console.log(err);
    });
}

function App() {
  const [users, setUsers] = useState();

  authLogin();

  function userData() {
    axios
      .get("http://localhost:4000/api/users")
      .then(data => {
        console.log(data);
        setUsers(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  setTimeout(function() {
    userData();
  }, 3000);

  return (
    <div>
      <h1> {JSON.stringify(users)} </h1>
    </div>
  );
}

export default App;
