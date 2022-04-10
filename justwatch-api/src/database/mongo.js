// ./src/database/mongo.js
const {MongoMemoryServer} = require('mongodb-memory-server');
let MongoClient = require('mongodb').MongoClient;



let database = null;

async function startDatabase() {
  const mongo = await MongoMemoryServer.create();
  const mongoDBURL = mongo.getUri();
  const connection = await MongoClient.connect(mongoDBURL, {useNewUrlParser: true});
  database = connection.db();
}

async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}

module.exports = {
  getDatabase,
  startDatabase,
};