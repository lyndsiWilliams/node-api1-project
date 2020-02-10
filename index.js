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


// POST - /api/users - insert()
server.post('/api/users', (req, res) => {
  const userInfo = req.body;

  if (!req.body.name || !req.body.bio) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  } else {
    Users.insert(userInfo).then(user => {
      res.status(201).json(user);
    }).catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    });
  }
  res.status(200);
});

// GET - /api/users - find()
server.get('/api/users', (req, res) => {
  Users.find().then(users => {
    res.status(200).json(users);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ errorMessage: 'The users information could not be retrieved.' });
  });
  res.status(200);
});

// GET - /api/users/:id - findById()

// DELETE - /api/users/:id - remove()

// PUT - /api/users/:id - update()