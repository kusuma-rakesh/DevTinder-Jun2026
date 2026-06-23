const mongoClient = require("mongodb").MongoClient;
const mConnStr = "mongodb://localhost:27017/";
const database = "devTinder";
const db_collection = "User";
const conn = mongoClient.connect(mConnStr);

module.exports = { conn, database, db_collection };
