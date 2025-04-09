import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Replace with a direct connection string
const MONGO_URI = 'mongodb://localhost:27017/job-tracker';

console.log('Testing local MongoDB Connection...');
console.log('Trying connection to:', MONGO_URI);

const client = new MongoClient(MONGO_URI, {
  serverSelectionTimeoutMS: 5000
});

async function connect() {
  try {
    await client.connect();
    console.log('Successfully connected to local MongoDB!');
    
    // Now try to read something
    const database = client.db();
    const collections = await database.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    await client.close();
    process.exit(0);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.error('Error details:', err);
    console.log('Trying to continue without failing...');
    process.exit(0);
  }
}

connect(); 