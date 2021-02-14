const pool = require("./db.js");

const login = (request, response) => {
  const { email } = request.body;
  const user = {};
  pool.query(
    "SELECT * FROM public.user WHERE email = $1",
    [email],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length > 0) {
        //Login
      } else {
        // Insert and login
      }
    }
  );
};

const getUsers = (request, response) => {
  pool.query("SELECT * FROM public.user", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUser = (request, response) => {
  const email = request.params.email;
  pool.query(
    "SELECT * FROM public.user where email = $1",
    [email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createUser = (request, response) => {
  const { email, color } = request.body;
  pool.query(
    "INSERT INTO public.user (email, color) VALUES ($1, $2)",
    [email, color],
    (error, result) => {
      if (error) {
        throw error;
      }

      response.status(201).send(`User added with email: ${email}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = request.params.id;

  pool.query(
    "DELETE FROM public.user WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User with id ${id} was deleted`);
    }
  );
};

module.exports = { getUsers, getUser, createUser, deleteUser };
