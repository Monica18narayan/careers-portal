const express = require('express');
const app = express();
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'JobDb',
  password: 'root',
  port: 5432,
});

const corsOptions = {
  origin: 'http://localhost:4200'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to your application.' });
});

pool.connect();
app.get('/api/applyjob', (req, res) => {
  pool.query('SELECT * FROM applyjob', (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching data from the database' ,error});
    } else {
      res.json(result.rows);
    }
  });
});


app.post('/api/applyjob', (req, res) => {
  const {
    firstname,
    lastname,
    gender,
    email,
    phone,
    dob,
    cursal,
    loc,
    skill,
    compname,
    jobtitle,
    jobloc,
    course,
    branch,
    college,
    colloc
  } = req.body;

  pool.query(
    'INSERT INTO applyjob (firstname, lastname, gender, email, phone, dob, cursal, loc, skill, compname, jobtitle, jobloc, course, branch, college, colloc) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)',
    [
      firstname,
      lastname,
      gender,
      email,
      phone,
      dob,
      cursal,
      loc,
      skill,
      compname,
      jobtitle,
      jobloc,
      course,
      branch,
      college,
      colloc
    ],
    (error, result) => {
      if (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ message: 'Error inserting data into the database' });
      } else {
        res.status(201).json({ message: 'Data inserted successfully' });
      }
    }
  );
});



app.delete('/api/applyjob/:email', (req, res) => {
  const email = req.params.email;

  pool.query(
    'DELETE FROM applyjob WHERE email = $1',
    [email],
    (error, result) => {
      if (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ message: 'Error deleting data from the database' });
      } else {
        if (result.rowCount === 0) {
          res.status(404).json({ message: 'No matching record found for deletion' });
        } else {
          res.status(200).json({ message: 'Data deleted successfully' });
        }
      }
    }
  );
});




const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
