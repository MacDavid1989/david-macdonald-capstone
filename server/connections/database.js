const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

// const url = process.env.MONGODB_URL;
const url = process.env.MONGODB_URL
const dbName = "grubbery";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

exports.initialize = () => {
    return new Promise((resolve, reject) => {
      client.connect((err) => {
        err&&reject(err);
        console.log("Connected to database!");
        db = client.db(dbName);
      });
      resolve();
    });
}