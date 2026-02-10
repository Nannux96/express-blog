const { Pool } = require('pg');

const paramConnessione = {
  connectionString: "postgres://postgres:nicola@localhost:5432/social"
}

let db = new Pool(paramConnessione)

module.exports = db;