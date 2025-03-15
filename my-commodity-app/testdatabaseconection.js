const db = require('./db');

async function testDB() {
  try {
    const results = await db.queryAsync('SELECT 1 + 1 AS solution');
    console.log('Database connected successfully. Test Query Result:', results);
  } catch (err) {
    console.error('Database connection failed:', err);
  }
}

testDB();