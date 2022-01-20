const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.PGDATABASE,
});

// Try to connect to the database or throw an error
pool.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('Connected to the database');
    }
});
  
// Export db
  module.exports = {
    query: (text, params) => pool.query(text, params),
    pool,
  };