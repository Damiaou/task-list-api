const { Pool } = require('pg');

const pg_password = process.env.pg_password;

const config = {
	user: 'sjoycbos',
	host: 'kandula.db.elephantsql.com',
	database: 'sjoycbos',
	password: pg_password,
	port: 5432,
};

let pool = null;
try {
	pool = new Pool(config);
} catch (e) {
	throw e;
}

module.exports = pool;
