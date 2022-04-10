// ./src/database/user.js
const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');

const collectionName = 'users';


async function insertUser(user) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(user);
  return insertedId;
}

//get all users
async function getUsers() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

//get specific user
async function getUserByID(id) {
    const database = await getDatabase();
    var query = { _id: id };
    return await database.collection(collectionName).find(query).toArray();
  }

//update specific user
async function updateUser(id, newValueData) {
    const database = await getDatabase();
    var myquery = { _id: id };
    var newvalue = { $set: newValueData };
    return await database.collection(collectionName).updateOne(myquery, newValue);
  }


module.exports = {
    insertUser, 
    getUsers, 
    getUserByID, 
    updateUser
};