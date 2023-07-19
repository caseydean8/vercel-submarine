require('dotenv').config();
const app = require('./config/express-config');
const mongoose = require('mongoose');
// const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;
// Mac airplay receiver must be turned off for port 5000 to work
const PORT = process.env.PORT || 5000;

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  err => {
    if (err) {
      console.log('There is a problem with the connection' + err);
    } else {
      console.log('===================Mongoose connection is good.====================');
    }
  }
);

//server is up and running
app.listen(PORT);

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db('admin').command({ ping: 1 });
//     console.log('Pinged your deployment. You successfully connected to MongoDB!');
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// moved database from mlab to cloud.mongodb.com. Had to create database in Cluster0 called submarine, and add collections users and subscriptions. For this to work on Heroku you have to whitelist/add IP address 0.0.0.0/0 by navigating to SECURITY/Network Access/IP Access List in the cloud.mongo dashboard.
//https://stackoverflow.com/questions/42159175/connecting-heroku-app-to-atlas-mongodb-cloud-service
// Also changed config vars MONGODB_URI in Heroku settings
