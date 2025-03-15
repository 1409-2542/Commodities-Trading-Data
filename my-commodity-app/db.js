// db.js
const mysql = require('mysql2');
require('dotenv').config();

// Create a MySQL connection
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'agna',
  password: process.env.DB_PASSWORD || 'ag9892na',
  database: process.env.DB_NAME || 'commodities_trading_data',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Wrapping db.query in a promise
const queryAsync = (sql, values) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

db.queryAsync = queryAsync;

module.exports = db;