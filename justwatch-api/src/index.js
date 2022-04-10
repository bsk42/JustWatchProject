// ./src/index.js

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {startDatabase} = require('./database/mongo');
const {insertMovies, getMovies, getMovieByID} = require('./database/movies');
const {insertUser, getUsers, getUserByID, updateUser} = require('./database/user');
let jsonMovieData = require('./database/popularMovies.json');
let jsonSampleUser = require('./database/sampleUsers.json');
const e = require('express');

// defining the Express app
const app = express();

// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

//MOVIES

// defining an endpoint to return all movies
app.get('/movies', async (req, res) => {
    res.send(await getMovies());
  });

app.get('/movies/:id', async (req, res) => {
    res.send(await getMovieByID(req.params.id));
  });


  app.post('/movies', async (req, res) => {
    const newMovies = req.body;
    await insertMovies(newMovies);
    res.send({ message: 'New movies inserted.' });
  });


// USERS
  
app.get('/users', async (req, res) => {
    res.send(await getUsers());
  });


app.post('/users', async (req, res) => {
    const newUser = req.body;
    await insertUser(newUser);
    res.send({ message: 'New user inserted.' });
  });

app.get('/users/:id', async (req, res) => { 
    res.send(await getUserByID(req.params.id));
    console.log(req.params.id);
  });

app.get('/users/:id', async (req, res) => { 
    res.send(await getUserByID(req.params.id));
    console.log(req.params.id);
  });

// endpoint to update a user
app.put('/users/:id', async (req, res) => {
    let type = req.query.type;
    let movieID = req.query.movieID;
    const id = req.params.id;

    if (type && movieID && (type == "like" || type == "dislike")) {
        await updateUser(is, type, movieID);
        res.send({ message: 'User updated.' });
    } else {
        res.send({ message: 'User not updated.' });
    }
    
  });


//   // endpoint to delete an ad
//   app.delete('/:id', async (req, res) => {
//     await deleteAd(req.params.id);
//     res.send({ message: 'Ad removed.' });
//   });
  
//   // endpoint to update an ad
//   app.put('/:id', async (req, res) => {
//     const updatedAd = req.body;
//     await updateAd(req.params.id, updatedAd);
//     res.send({ message: 'Ad updated.' });
//   });

// start the in-memory MongoDB instance
startDatabase().then(async () => {
    await insertMovies(jsonMovieData);
    await insertUser(jsonSampleUser);
  
    // start the server
    app.listen(3001, async () => {
      console.log('listening on port 3001');
    });
  });