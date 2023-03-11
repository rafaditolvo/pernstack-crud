const { Pool } = require("pg");
const { db } = require("./config");
const pool = new Pool({
  user: "postgres",
  password: "123456",
  host: "localhost",
  port: 5432,
  database: "tarefasdb",
});

module.exports = pool;
