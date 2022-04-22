// ./src/database/movies.js
const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');

const collectionName = 'movies';


async function insertMovies(movie) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertMany(movie);
  return insertedId;
}

//get all movies
async function getMovies() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

//get specific user
async function getMovieByID(id) {
  const database = await getDatabase();
  var query = { _id: id };
  return await database.collection(collectionName).find(query).toArray();
}

// //get specific movie
// async function getMovieByID(id) {
//     const database = await getDatabase();
//     return await database.collection(collectionName).find({_id: id});
//   }


module.exports = {
    insertMovies,
    getMovies,
    getMovieByID
};