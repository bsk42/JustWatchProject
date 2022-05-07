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
    throw new Error('could not connect to db');
  }
}

async function login(db, username, password) {
  try {
    const result = await db.collection('Users').findOne({ username: username, password: password });
    return result;
  } catch (err) {
    throw new Error('could not login');
  }
}

async function register(db, newUser){
    try {
        const user = await db.collection('Users').findOne({username: newUser.username});
        //console.log(user);
        if (user === null) {

          const result = await db.collection('Users').insertOne(newUser);
          console.log(`Created player with id: ${result.insertedId}`);
          return result;
        }
        //return 'user already exists'
    } catch (err) {
        throw new Error('could not add a player');
    }
        
};

async function getUsers(db) {
  try {
    return await db.collection('Users').find({}).toArray();
  } catch (err) {
    throw new Error('could not find all users')
  }
}

// delete player
async function deleteUser(db, username) {
  try {
    // retrieve all the players in the collection and convert the cursor
    // to an array
    await db.collection('Users').deleteMany({ username: username });
  } catch (err) {
    throw new Error('could not delete player');
  }
}

async function getMovieIds(db) {
    try {
        return await db.collection('Movies').find({}).project( {_id: 1} ).map(x => x._id).toArray();
    } catch (err) {
      throw new Error('could not find movie ids');
    }
}

async function getMovies(db) {
  try {
      return await db.collection('Movies').find({}).toArray();
  } catch (err) {
    console.log(err);
    throw new Error('could not find all movies');
  }
}

async function getMovieByID(db, id) {
    try {
    const data = await db.collection('Movies').findOne({_id: id});
    //console.log(data);
    return data;
    } catch (err) {
      console.log(err);
      throw new Error('could not find movie');
    }
  }

async function getUser(db, username) {
    try {
        const res = await db.collection('Users').findOne({username: username});
        // console.log(res);
        return res;
    } catch (err) {
        throw new Error('could not find user');
    }
}

async function getAllUsers(db) {
  try {
      const res = await db.collection('Users').find({}).toArray();
      return res;
  } catch (err) {
      throw new Error('could not find users');
  }
}

async function getFriends(db, username) {
    try {
      return await db.collection('Friends').find({from: username}).toArray();
    } catch (err) {

    }
}

async function addFriend(db, user1, user2) {
    try {
        const {insertedId} =  await db.collection('Friends').insertOne({from: user1.username, to: user2.username});
        await db.collection('Friends').insertOne({from: user2.username, to: user1.username});
    } catch (err) {

    }
}

async function startConversation(db, user1, user2) {
  try {
      const {insertedId} =  await db.collection('Messages').insertOne({users: [user1, user2], content:[] });
      return insertedId;
  } catch (err) {
  }
}

async function fetchMessages(db, user1) {
  try {
    const results = await db.collections('Messages').find({users: user1});
    return results;
  } catch (err) {

  }
}

async function sendMessage(db, user1, user2, message) {
  try {
    const results = await db.collections('Messages').find({users: {$all: [user1, user2]}});
    const messages = results.content;
    messages.push(message);
    await db.collections('Messages').findOneAndReplace({users: {$all: [user1, user2]}}, {users: [user1, user2], content: messages});
  } catch (err) {
    
async function getInteractions(db) {
  try {
    return await db.collection('Interactions').find({}).toArray();
  } catch (err) {
    throw new Error('could not find all interactions');
  }
}

//Movie interactions:
//like, dislike, superlike
async function newMovieInteract(db, username, movie, interaction) {
  try {
      const {insertedId} =  await db.collection('Interactions').insertOne({username: username, movie: movie, interaction: interaction});
      return insertedId;
  } catch (err) {

  }
}

async function getMovieInteractionsByUser(db, username) {
  try {
      return await db.collection('Interactions').find({username: username}).toArray();
  } catch (err) {

  }
}


async function getLikesByUser(db, username) {
  try {
      return await db.collection('Interactions').find({username: username, interaction: "like"}).toArray();
  } catch (err) {

  }
}


module.exports = {

  connect, 
  register, 
  login, 
  getMovies, 
  getMovieByID, 
  getUser, 
  getAllUsers,
  getFriends, 
  addFriend, 
  newMovieInteract, 
  deleteUser,
  getMovieInteractionsByUser,
  getMovieIds,
  getLikesByUser,
  getInteractions
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
