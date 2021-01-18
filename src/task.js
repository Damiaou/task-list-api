const pool = require("./db.js");

const getTasks = (request, response) => {
  pool.query("SELECT * FROM task", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getTask = (request, response) => {
  const { id } = request.body;
  pool.query("SELECT * FROM task WHERE id= $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createTask = (request, response) => {
  const { label, repeat, home_hash } = request.body;
  pool.query(
    "INSERT INTO task (label, done, id_repeat, id_done_by) VALUES ($1, $2, $3)",
    [label, repeat, home_hash],
    (error, result) => {
      if (error) {
        throw error;
      }

      response.status(201).send(`Task ${label} was added`);
    }
  );
};

const deleteTask = (request, response) => {
  const id = request.params.id;

  pool.query("DELETE FROM task WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Task with id ${id} was deleted`);
  });
};

module.exports = { getTasks, getTask, createTask, deleteTask };
