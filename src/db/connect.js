// src/db/connect.js
import { MongoClient } from 'mongodb';

let db;

export async function connectToMongoDB(mongoUri, dbName) {
  const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  db = client.db(dbName);
  console.log('Connected to MongoDB');
  return db;
}
