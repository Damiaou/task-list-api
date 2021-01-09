const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const crc32 = require("crc32");

const app = express();

let pool = null;
try {
  pool = new Pool({
    user: "sjoycbos",
    host: "kandula.db.elephantsql.com",
    database: "sjoycbos",
    password: process.env.pg_password,
    port: 5432
  });
} catch (e) {
  console.log(e);
}

// Warning if something went wrong with the db
if (!pool) {
  app.get("/", (req, res) => {
    res.send(
      "<h2 style='color:red'>Connection with db not working properly :(</h2>"
    );
  });
}

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

// First home get and create
app
  .route("/home")
  .get((req, res) => {
    getHomes(req, res);
  })
  .post((req, res) => {
    createHome(req, res);
  });

const getHomes = (request, response) => {
  pool.query("SELECT * FROM home", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createHome = (request, response) => {
  const { label } = request.body;
  const hash = crc32(label);
  pool.query(
    "INSERT INTO home (hash, label) VALUES ($1, $2)",
    [hash, label],
    (error, result) => {
      if (error) {
        throw error;
      }

      response.status(201).send(`Home added with hash: ${hash}`);
    }
  );
};
