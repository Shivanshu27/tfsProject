import { MongoClient } from 'mongodb';

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'tfs';

const mongoConnectionURL = "mongodb://localhost:27017/tfs";

async function connectMongo() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
//   app.set('db', client.db(dbName))
  global.mongodb = client.db(dbName);
//   const collection = db.collection('documents');

  return 'done.';
} 

export default connectMongo;