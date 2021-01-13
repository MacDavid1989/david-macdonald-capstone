const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://macdavid1989:D3g3N3r8@grubbery.jhshh.mongodb.net/grubbery?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log(collection)
  client.close();
});
