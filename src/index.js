const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { getHomes, getHome, createHome, deleteHome } = require("./home");
const { getUsers, getUser, createUser, deleteUser } = require("./user");
const { getTasks, getTask, createTask, deleteTask } = require("./task");
const {
  getRepeats,
  getRepeat,
  createRepeat,
  deleteRepeat
} = require("./repeat");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.listen(8080, () => {
  console.log("Started on (http://localhost:8080/) !");
});

// Warm welcome for all users
app.get("/", (req, res) => {
  res.send("<h2>Welcome to task list API</h2>");
});

// test

/**
 * ROUTING
 */
//        HOME
app.get("/home", getHomes);
app.get("/home/:hash", getHome);
app.post("/home", createHome);
app.delete("/home/:hash", deleteHome);

//        USER
app.get("/user", getUsers);
app.get("/user/:id", getUser);
app.post("/user", createUser);
app.delete("/user/:id", deleteUser);

//        REPEAT
app.get("/repeat", getRepeats);
app.get("/repeat/:id", getRepeat);
app.post("/repeat", createRepeat);
app.delete("/repeat/:id", deleteRepeat);

//        TASK
app.get("/task", getTasks);
app.get("/task/:id", getTask);
app.post("/task", createTask);
app.delete("/task/:id", deleteTask);
