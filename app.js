const express = require('express'); //express
const { Pool } = require('pg'); // pg-pool

const app = express(); //buat app
const port = 8000;

//pg-pool
const pool = new Pool({
  host: 'localhost',
  database: 'tasks_praktek',
  user: 'postgres',
  password: '12345',
  port: 5432
});

app.use(express.json());

// '/' ini adalah endpoint
app.post('/tasks', async function(req, res) {
    // const { title, description, due_date, is_completed } = req.body;

    let title = req.body.title;
    let description = req.body.description;
    let due_date = req.body.due_date;
    let is_completed = req.body.is_completed;

  try {
    let insert = await pool.query(

      //returning * mengembalikan data yang diubah atau didelete
      'INSERT INTO tasks (title, description, due_date, is_completed) VALUES ($1, $2, $3, $4) returning *', [title, description, due_date, is_completed]);

      res.json(insert.rows[0]);
  } catch (error) {
    console.error(error);
  };
});

app.get('/tasks', async function(req, res){
  try {
    let select = await pool.query(
      `select * from tasks`
    );
    res.send(select.rows);
  } catch (error) {
    console.error(error);
  };
});

// '/:id untuk input secara dinamis dan tidak hardcode'
app.get('/tasks/:id', async function(req, res){
  //params 
  let id = req.params.id;
  try {
    let select = await pool.query(
      `select * from tasks where id = $1`, [id]
    );
    res.send(select.rows);
  } catch (error) {
    console.error(error);
  };
});

// '/:id untuk input secara dinamis dan tidak hardcode'
app.put('/tasks/:id', async function(req, res){
  //params 
  let id = req.params.id;
  let title = req.body.title;
  try {
    let select = await pool.query(
      `update tasks set title = $1 where id = $2`, [title, id]
    );
    res.send(select.rows);
  } catch (error) {
    console.error(error);
  };
});

app.delete('/tasks/:id', async function(req, res){
  //params 
  let id = req.params.id;

  try {
    let select = await pool.query(
      `delete from tasks where id = $1`, [id]
    );
    res.send(select.rows);
  } catch (error) {
    console.error(error);
  };
});

//app listen port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
