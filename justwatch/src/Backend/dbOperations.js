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

async function getUser(db, username) {
  try {
    const result = await db.collection('Users').findOne({ username: username });
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('could not find player');
  }
}

async function addPlayer(db, newPlayer){
  try {
    let result;
    const existingPlayer = await getPlayer(db, newPlayer.player);
    console.log(existingPlayer);
    if (existingPlayer === null) {
      console.log('creating new player');
      try {
        result = await db.collection('Users').insertOne(newPlayer);
        console.log(`Created player with id: ${result.insertedId}`);
        return result;
      } catch (err) {
        throw new Error('could not add a player');
      }
    }
    return existingPlayer;
  } catch (e) {
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

module.exports = {
  connect, addPlayer, 
};

connect('mongodb+srv://cis350Final:cis350final@cluster0.gq1yt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
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
