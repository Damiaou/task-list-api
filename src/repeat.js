const pool = require("./db.js");

const getRepeats = (request, response) => {
  pool.query("SELECT * FROM repeat", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getRepeat = (request, response) => {
  const { id } = request.body;
  pool.query("SELECT * FROM repeat WHERE id= $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createRepeat = (request, response) => {
  const { label, home_hash, how_long } = request.body;
  pool.query(
    "INSERT INTO repeat (label, hom_hash, how_long) VALUES ($1, $2, $3)",
    [label, home_hash, how_long],
    (error, result) => {
      if (error) {
        throw error;
      }

      response.status(201).send(`Repeat ${label} was added`);
    }
  );
};

const deleteRepeat = (request, response) => {
  const id = request.params.id;

  pool.query("DELETE FROM repeat WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Repeat with id ${id} was deleted`);
  });
};

module.exports = { getRepeats, getRepeat, createRepeat, deleteRepeat };
