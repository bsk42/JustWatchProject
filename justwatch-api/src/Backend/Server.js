/* eslint-disable import/no-extraneous-dependencies */
// Create express app
const express = require('express');
const cors = require('cors');

const webapp = express();

// import database functions
const lib = require('./dbOperations');
const { json } = require('body-parser');

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
  console.log(req.body)
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

webapp.get('/users', async (req, resp) => {
  try {
    const result = await lib.getUsers(db);
    resp.status(200).json({ message: JSON.stringify(result) });
  } catch (err) {
    resp.status(500).json({ error: 'error retrieving users' });
  }
});

//get movie that the user has not interacted with yet
webapp.get('/users/getNewMovie', async (req, resp) => {
  const { username } = req.query;
  try {
      const allIds = await lib.getMovieIds(db);
      const interactions = await lib.getMovieInteractionsByUser(db, username);
      const interactedMovies = interactions.map(x => x.movie);
      const difference = allIds.filter(x => interactedMovies.indexOf(x) === -1);
      const newMovie = await lib.getMovieByID(db, difference[0]);
      resp.body =  JSON.stringify(newMovie);
      resp.status(200).json({ data: JSON.stringify(newMovie) });
      } catch (err) {
        resp.status(500).json({ error: 'error retrieving movie' });
      }
});

//get friends
webapp.get('/users/friendsList', async (req, resp) => {
  const { username } = req.query;
  try {
      const myLikes = (await lib.getLikesByUser(db, username)).map(x => x.movie);
      const allUsers = await lib.getAllUsers(db);
      const allUserWithLikes = await Promise.all(allUsers.map(async (user) => {
        const likes = await lib.getLikesByUser(db, user.username);
        const likesMovies = likes.map(x => x.movie);
        return {...user, likes: likesMovies};
      }));
      console.log(allUserWithLikes);
      const allUsersMatches = allUserWithLikes.map((user) => { 
        const matches = myLikes.filter(val => user.likes.includes(val));
        return {...user, matches: matches, numMatches: matches.length};
      });

      const allUsersMatchesWithNames =  await Promise.all(allUsersMatches.map(async (user) => { 
          const likesMoviesNames = await Promise.all(user.matches.map(async (movie) => {
          const myMovie = await lib.getMovieByID(db, movie);
          if (myMovie) {
            return myMovie.title;
          } else {
            return myMovie;
          }
        }));
        return {...user, movieMatches: likesMoviesNames};
      }));


      const result = allUsersMatchesWithNames.sort((a,b) => (a.numMatches < b.numMatches) ? 1 : -1);
      resp.status(200).json({ data: result });
      } catch (err) {
        console.log(err);
        resp.status(500).json({ error: 'error retrieving friends list' });
      }
});

//add new interaction
webapp.post('/newInteraction', async (req, resp) => {
  const { username, movie, interaction } = req.query;
  try {
      await lib.newMovieInteract(db, username, movie, interaction);
      resp.status(200).json({ message:  "new interaction added"});
      } catch (err) {
        resp.status(500).json({ error: 'error creating new interaction' });
      }
});

webapp.get('/interactions', async (req, resp) => {
  try {
    const result = await lib.getInteractions(db);
    resp.status(200).json({ message: JSON.stringify(result) });
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
    console.log(err);
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


//Messaging support

// messages endpoint - returns all the messages
webapp.get('/messages:username', (req, resp) =>{
    try {
      const result = await lib.fetchMessages(db, req.params.username);
      resp.status(200).json({message: JSON.stringify(result)});
    } catch (err) {
      resp.status(500).json({ error: 'try again later' });
 }});

// messages endpoint - sends a  new message
// message format: from/to/content
webapp.post('/messages', (req, resp) =>{
    //check the body
    if(!req.body.from || !req.body.to || !req.body.content){
        resp.status(400).json({error: 'missing message field(s)'});
        return;
    }
    //add the message to the list 
    await lib.sendMessage(db, req.body.from, req.body.to,{
      from: req.body.from,
      to:req.body.to,
      content:req.body.content,
    });
  
    resp.status(201).json({receipt: 'ok'});
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
