/* eslint-disable import/no-extraneous-dependencies */
// Create express app
const express = require('express');

const webapp = express();

// import database functions
const lib = require('./dbOperations');

const url = 'mongodb+srv://cis350Final:cis350Final@cluster0.gq1yt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

let db;

webapp.use(express.json());
webapp.use(
  express.urlencoded({
    extended: true,
  }),
);

// Root endpoint
webapp.get('/', (req, res) => {
  res.json({ message: 'Welcome to Just Watch Backend' });
});

// TODO: define all endpoints as specified in REST API

webapp.post('/register', async (req, resp) => {
  // check the name was provided
  try {
    const result = await lib.register(db, { username: req.body.username, name: req.body.name, email: req.body.email, password: req.body.password });
    // send the response
    resp.status(201).json({ message: `Player with username ${JSON.stringify(result.username)} added` });
    console.log('player inserted');
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

webapp.get('/login/:username/:password', async (req, resp) => {
  // check the name was provided
  try {
    const result = await lib.login(db, req.params.username, req.params.password)
    // send the response
    resp.status(200).json({ message: JSON.stringify(result) });
    console.log('questions fetched');
  } catch (err) {
    resp.status(500).json({ error: 'error logging in' });
  }
});

webapp.get('/movies', async (req, resp) => {
  try {
    const result = await lib.getMovies();
    resp.status(200).json({ message: JSON.stringify(result) });
    console.log('leaders fetched');
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

webapp.delete('/delete/:player', async (req, resp) => {
  try {
    console.log(req.params.player);
    await lib.deletePlayer(db, req.params.player);
    resp.status(200).json({ message: JSON.stringify('player deleted') });
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

// Update Score
webapp.put('/leaders', async (req, resp) => {
  try {
    const result = await lib.updateScore(db, req.body.player, req.body.points);
    resp.status(200).json({ message: JSON.stringify(result) });
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

// Default response for any other request
webapp.use((_req, res) => {
  res.status(404);
});

// Start server
const port = process.env.PORT || 5005;
webapp.listen(port, async () => {
  try {
    db = await lib.connect(url);
    console.log(`Express server running on port:${port}`);
  } catch (err) {
    throw new Error('cannot start server');
  }
});

module.exports = webapp; // export for testing
