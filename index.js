// Import express
const express = require('express');
// Import cors
const cors = require('cors');
// Create server
const server = express();
// Create port
const port = 5000;
// Tell server where to listen (port)
server.listen(port, () => console.log(`\n** API on port ${port} \n`));
// Middleware
server.use(express.json());
server.use(cors());
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

server.get('/', (req, res) => {
  res.send(`Welcome!`);
});

// GET - /api/users - find()
server.get('/api/users', (req, res) => {
  Users.find().then(users => {
    res.status(200).json(users);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ errorMessage: "The users information could not be retrieved." });
  });
  res.status(200);
});

// GET - /api/users/:id - findById()
server.get('/api/users/:id', (req, res) => {
  if (!req.params.id) {
    res.status(404).json({ message: "The user with the specified ID does not exist." })
  } else {
    Users.findById(req.params.id).then(users => {
      res.status(200).json(users);
    }).catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "The users information could not be retrieved." });
    });
  }
  res.status(200);
});

// DELETE - /api/users/:id - remove()
server.delete('/api/users/:id', (req, res) => {
  if (!req.params.id) {
    res.status(404).json({ message: "The user with the specified ID does not exist." })
  } else {
    Users.remove(req.params.id).then(removed => {
      res.status(200).json(removed);
    }).catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "The user could not be removed." });
    });
  }
  res.status(200);
});

// PUT - /api/users/:id - update()
server.put('/api/users/:id', (req, res) => {
  const changes = req.body;
  
  if (!req.params.id) {
    res.status(404).json({ message: "The user with the specified ID does not exist." })
  } else if (!req.body.name || !req.body.bio) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  } else {
    Users.update(req.params.id, changes).then(change => {
      res.status(200).json(change)
    }).catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "The user information could not be modified." });
    });
  }
  res.status(200);
});