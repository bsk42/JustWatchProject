/* eslint-disable import/no-extraneous-dependencies */
// Create express app
const express = require('express');
const cors = require('cors');

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
webapp.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

// Root endpoint
webapp.get('/', (req, res) => {
  res.json({ message: 'Welcome to Just Watch Backend' });
});

// TODO: define all endpoints as specified in REST API

webapp.post('/register', async (req, resp) => {
  // check the name was provided
  try {
    // console.log(req.body);
    const result = await lib.register(db, { username: req.body.username, name: req.body.name, email: req.body.email, password: req.body.password });
    // send the response
    resp.status(201).json({ message: `Player with username ${JSON.stringify(result.username)} added` });
    console.log('player inserted');
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

// webapp.post('/login', async (req, resp) => {
//   // check the name was provided
//   console.log('in server for login');
//   try {
//     const result = await lib.login(db, req.body.username, req.body.password);
//     // send the response
//     resp.status(201).json({ message: JSON.stringify(result) });
//     console.log('user logged in');
//   } catch (err) {
//     resp.status(500).json({ error: 'error logging in' });
//   }
// });

webapp.get('/movies', async (req, resp) => {
  try {
    const result = await lib.getMovies(db);
    resp.status(200).json({ message: JSON.stringify(result) });
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
    console.log(err);
  }
});

webapp.get('/movies/:id', async (req, resp) => {
  try {
    const result = await lib.getMovieByID(db, req.params.id);
    resp.status(200).json({ message: `Movie with id ${JOSN.stringify(result.id)} received` });
    console.log(`movie with id ${JOSN.stringify(result.id)} received`);
  } catch (err) {
    resp.status(500).json({ error: 'error retrieving movie' });
  }
});

webapp.get('/users/getUser', async (req, resp) => {
  const { username, password } = req.query;
  try {
        // LOGIN IF PASSWORD PROVIDED
        if (password) {
          result = await lib.login(db, username, password);
        } else {
          result = await lib.getUser(db, username);
        }
        if (result == null) {
          resp.status(404).json({ error: 'user not found' });
        } else {
          resp.status(200).json({ message: JSON.stringify(result) });
        }
      } catch (err) {
        resp.status(500).json({ error: 'error retrieving user' });
      }
});

// GET USER - EITHER BY JUST USERNAME OR BY USERNAME & PASSWORD (FOR LOGIN)
// webapp.get('/users/getUser', async (req, resp) => {
//   //const { username, password } = req.query;
//   console.log("ran");
//   resp.status(200);
//   // try {
//   //   const result = null;
//   //   // LOGIN IF PASSWORD PROVIDED
//   //   if (password) {
//   //     result = await lib.login(db, username, password);
//   //   } else {
//   //     result = await lib.getUser(db, username);
//   //   }
//   //   if (result == null) {
//   //     resp.status(404).json({ error: 'user not found' });
//   //   } else {
//   //     resp.status(200).json({ message: JSON.stringify(result) });
//   //   }
//   // } catch (err) {
//   //   resp.status(500).json({ error: 'error retrieving user' });
//   // }
// });

webapp.get('/users/friends/:username', async (req, resp) => {
  try {
    const result = await lib.getFriends(db, req.params.username);
    resp.status(200).json({ message: JSON.stringify(result) });
  } catch (err) {
    resp.status(500).json({ error: 'error retrieving friends' });
  }
});

webapp.post('/users/addFriend', async (req, resp) => {
  try {
    const result = lib.addFriend(db, 
      {username: req.body.username1, email: req.body.email1},
      {username: req.body.username2, email: req.body.email2});
      resp.status(201).json({ message: `User 1 added User 2 as a friend` }); // make more descriptive message
      console.log('friend added');
  } catch (err) {
    resp.status(500).json({ error: 'failed to add friend' });
  }
});

webapp.post('/movies/interact', async (req, res) => {
  try {
    const result = lib.movieInteract(db, req.body.username, req.body.movie_id, interaction);
    resp.status(201).json({ message: `${req.body.username} had reaction: ${req.body.interaction} to movie ${req.body.movie_id}` });
    console.log('movie reaction');
  } catch (err) {
    resp.status(500).json({ error: 'failed to complete interaction' });
  }
})

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
// webapp.put('/leaders', async (req, resp) => {
//   try {
//     const result = await lib.updateScore(db, req.body.player, req.body.points);
//     resp.status(200).json({ message: JSON.stringify(result) });
//   } catch (err) {
//     resp.status(500).json({ error: 'try again later' });
//   }
// });

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
