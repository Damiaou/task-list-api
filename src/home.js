const pool = require("./db.js");
const crc32 = require("crc32");

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

const deleteHome = (request, response) => {
  const hash = request.params.hash;

  pool.query("DELETE FROM home WHERE hash = $1", [hash], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Home with hash ${hash} was deleted`);
  });
};

module.exports = { getHomes, createHome, deleteHome };
