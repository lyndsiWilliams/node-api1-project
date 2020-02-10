// Import express
const express = require('express');
// Create server
const server = express();
// Create port
const port = 5000;
// Tell server where to listen (port)
server.listen(port, () => console.log(`\n** API on port ${port} \n`));
// Middleware
server.use(express.json());
// Server objects
const Users = require('./data/db.js');


// POST - /api/users

// GET - /api/users
server.get('/api/users', (req, res) => {
  Users.find().then(users => {
    res.status(200).json(users);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ errorMessage: 'The users information could not be retrieved.' });
  });
  res.status(200);
});

// GET - /api/users/:id

// DELETE - /api/users/:id

// PUT - /api/users/:id