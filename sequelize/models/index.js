'use strict';

const { Sequelize } = require('sequelize');
const express = require('express');
const UsersModel = require('./user'); 
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const user = require('./user');
const PORT = process.env.PORT || 3001;
app.use(cors());

// Create a Sequelize instance
const sequelize = new Sequelize('Sequelize_db', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});

const Users = UsersModel(sequelize); 
app.use(bodyParser.json());

const syncDatabase = async () => {
  try {
    await Users.sync(); 
    console.log("The table for the Users model was just created!"); 
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/api/add-user', async (req, res) => {
  try {
    const { firstName, lastName, email, age } = req.body; // Updated variable names
    const newUser = await Users.create({
      firstName,
      lastName,
      email,
      age
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/get-users', async (req, res) => {
  try {
    const allUsers = await Users.findAll();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const { Op } = require('sequelize');

app.get('/api/get-user-by-email/:email', async (req, res) => {
  const { email } = req.params; // Retrieve email from route parameters

  try {
    const user = await Users.findOne({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/api/update-user/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const { firstName, lastName, newEmail, age } = req.body;

    const updatedUser = await Users.findOne({ where: { email } });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user details
    updatedUser.firstName = firstName;
    updatedUser.lastName = lastName;
    updatedUser.email = newEmail; // Assuming you can update the email
    updatedUser.age = age;

    await updatedUser.save(); // Save the updated user details

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/delete-user-by-email/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const existingUser = await Users.findOne({ where: { email } });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    await existingUser.destroy();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




syncDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to synchronize with the database:', error);
  });
