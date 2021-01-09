const express = require("express");
const bodyParser = require("body-parser");
const { getHomes, createHome, deleteHome } = require("./home");

const app = express();

app.listen(8080, () => {
  console.log("Started on (http://localhost:8080/) !");
});

// Warm welcome for all users
app.get("/", (req, res) => {
  res.send("<h2>Welcome to task list API</h2>");
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

/**
 * ROUTING
 */
//        HOME
app.get("/home", getHomes);
app.post("/home", createHome);
app.delete("/home/:hash", deleteHome);

//        USER

// First home get and create
// app
//   .route("/home/:id")
//   .get((req, res) => {
//     getHomes(req, res);
//   })
//   .post((req, res) => {
//     createHome(req, res);
//   })
//   .delete((req, res) => {
//     deleteHome(req, res);
//   });
