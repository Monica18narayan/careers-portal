const express = require('express');
const app = express();
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');

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


app.post('/api/chat', (req, res) => {
  const userMessage = req.body.message;
  // Example: Mock response from a simple chatbot
  const botResponse = generateBotResponse(userMessage);
  res.json({ message: botResponse });
});


function generateBotResponse(userMessage) {
  const greetings = ['hello', 'hi', 'hey', 'greetings'];
  const farewells = ['bye', 'goodbye', 'see you', 'farewell'];
  const questions = ['how are you?', 'what is your name?', 'where are you from?'];
  const careerRelatedQueries = ['job openings', 'apply for a job', 'company culture', 'career growth'];

  const lowerCaseUserMessage = userMessage.toLowerCase();

  
  if (greetings.some(greeting => lowerCaseUserMessage.includes(greeting))) {
    return 'Hello there! How can I assist you today with your career queries?';
  } else if (farewells.some(farewell => lowerCaseUserMessage.includes(farewell))) {
    return 'Goodbye! Have a great day!';
  } else if (questions.some(question => lowerCaseUserMessage.includes(question))) {
    return 'I am just a simple bot. Please ask something related to your career!';
  } else if (careerRelatedQueries.some(query => lowerCaseUserMessage.includes(query))) {
   
    return 'We have various job openings available. Please visit our careers page to explore them!';
  } else {
    return 'I am not sure how to respond to that.';
  }
}


app.post('/generate-qrcode', async (req, res) => {
  const { link } = req.body;

  try {
    
    const qrCodeData = await QRCode.toDataURL(link);
    res.send({ qrCodeData });
  } catch (error) {
    res.status(500).send({ error: 'Error generating QR code' });
  }
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

app.get('/api/JobDetailsByEmail/:email', (req, res) => {
  const jobEmail = req.params.email; // Get the email from the URL parameter
  const query = {
    text: 'SELECT * FROM applyjob WHERE email = $1',
    values: [jobEmail],
  };
  pool.query(query, (error, result) => {
    if (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Error fetching data from the database' });
    } else {
      res.json(result.rows);
    }
  });
});


app.put('/api/applyjob/:email', (req, res) => {
  const email = req.params.email; // Get the email from the URL parameter
  const {
    firstname,
    lastname,
    gender,
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
    'UPDATE applyjob SET firstname = $1, lastname = $2, gender = $3, phone = $4, dob = $5, cursal = $6, loc = $7, skill = $8, compname = $9, jobtitle = $10, jobloc = $11, course = $12, branch = $13, college = $14, colloc = $15 WHERE email = $16',
    [
      firstname,
      lastname,
      gender,
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
      colloc,
      email // The email for the WHERE clause
    ],
    (error, result) => {
      if (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ message: 'Error updating data in the database' });
      } else {
        if (result.rowCount > 0) {
          res.status(200).json({ message: 'Data updated successfully' });
        } else {
          res.status(404).json({ message: 'Data not found for the given email' });
        }
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
