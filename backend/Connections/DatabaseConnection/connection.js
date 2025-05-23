require('dotenv').config();
const { MongoClient } = require('mongodb');

const user = "muskansrivastava0305";
const password = encodeURIComponent("1234"); // You may want to store this in environment variables
const dbName = "auth-db";
const host = "erp-pro.hgrj1ql.mongodb.net";

const mongoUri = `mongodb+srv://${user}:${password}@${host}/${dbName}?retryWrites=true&w=majority&appName=Erp-pro`;
const client = new MongoClient(mongoUri);

// Function to connect to MongoDB
async function connect() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    return client.db(dbName);
  } catch (error) {
    console.error("❌ Connection error:", error.message);
    throw new Error("Error connecting to MongoDB");
  }
}


module.exports={connect}
