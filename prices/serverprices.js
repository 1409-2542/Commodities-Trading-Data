const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "agna", // Change as needed
  password: "ag9892na", // Change as needed
  database: "commodities_trading_data"
});

db.connect(err => {
  if (err) throw err;
  console.log("Database connected!");
});

app.get("/api/commodities", (req, res) => {
  const query = `
SELECT 
    c.title AS category_title,
    s.title AS subcategory_title,
    co.name AS commodity_name,
    p.price,
    p.daily_change,
    p.percent_change,
    p.date
FROM 
    categories c
JOIN 
    subcategories s ON c.id = s.category_id
JOIN 
    commodities co ON s.id = co.subcategory_id
JOIN 
    prices p ON co.id = p.commodity_id;
  `;

  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));