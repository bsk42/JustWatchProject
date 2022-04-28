/* eslint-disable no-unused-vars */
// 1. Import MongoDB driver
const { MongoClient } = require('mongodb');

// 2. Connect to the DB and return the connection object
const connect = async (url) => {
  try {
    const conn = (await MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )).db();

    console.log(`Connected to the database: ${conn.databaseName}`);
    return conn;
  } catch (err) {
    console.error(err);
    throw new Error('could not connect to db');
  }
}

async function login(db, username, password) {
  try {
    const result = await db.collection('Users').findOne({ username: username, password: password });
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('could not login');
  }
}

async function register(db, newUser){
    try {
        const result = await db.collection('Users').insertOne(newUser);
        console.log(`Created player with id: ${result.insertedId}`);
        return result;
    } catch (err) {
        throw new Error('could not add a player');
    }
        
};

// delete player
async function deletePlayer(db, name) {
  try {
    // retrieve all the players in the collection and convert the cursor
    // to an array
    await db.collection('Players').deleteMany({ player: name });
  } catch (err) {
    console.error(err);
    throw new Error('could not delete player');
  }
}

async function insertMovie(db, movie) {
    try {
        const {insertedId} = db.collection('Movies').insertMany(movie);
        return insertedId
    } catch (err) {

    }
}

async function getMovies(db) {
    try {
        return await db.collection('Movies').find({}).toArray();
    } catch (err) {

    }
}

module.exports = {
  connect, register, login
};

connect('mongodb+srv://cis350Final:cis350Final@cluster0.gq1yt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
// this is the URL from the database
// cis350HW5 = password
// Test_Data is database name
/*
const main = async () => {
  const db = await connect('mongodb+srv://cis350HW5:cis350HW5@cluster0.b0nwj.mongodb.net/Test_Data?retryWrites=true&w=majority');
  // await addPlayer(db, {name: 'Chris', points: 0});
  await addPlayer(db, { name: 'Lena', points: 1 });
};

main();
*/
