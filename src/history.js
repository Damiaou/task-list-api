const pool = require("./db.js");

const getHistories = (request, response) => {
  pool.query("SELECT * FROM history", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getHistory = (request, response) => {
  const { id } = request.body;
  pool.query("SELECT * history WHERE id= $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createHistory = (request, response) => {
  const { id_user, id_task, date } = request.body;
  pool.query(
    "INSERT history (id_user, id_task, date) VALUES ($1, $2, $3)",
    [id_user, id_task, date],
    (error, result) => {
      if (error) {
        throw error;
      }

      response.status(201).send(`History was added`);
    }
  );
};

const deleteHistory = (request, response) => {
  const id = request.params.id;

  pool.query("DELETE history WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`History with id ${id} was deleted`);
  });
};

module.exports = { getHistories, getHistory, createHistory, deleteHistory };
