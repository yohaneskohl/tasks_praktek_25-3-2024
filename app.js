const express = require('express'); 
const { Pool } = require('pg');

const app = express(); //buat app
const port = 3000;

const pool = new Pool({
  host: 'localhost',
  database: 'task_praktek',
  user: 'postgres',
  password: '12345',
  port: 5432
});

app.get('/', (req, res) =>{
    res.send("hello world!")
});




app.post('/tasks', async function(req, res) {
  try {
    const { title, description, due_date, is_completed } = req.body;
    await pool.query(
      'INSERT INTO tasks (title, description, due_date, is_completed) VALUES ($1, $2, $3, $4)', [title, description, due_date, is_completed]
      );

  } catch (error) {
    console.error(error);
  }
});

app.use(express.json());
//app listen port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
