const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const dbUrl = process.env.url || require('./config/db').url;
const path = require('path');

const app = express();

const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, '/public')));

MongoClient.connect(dbUrl, (err, client) => {
  if (err) return console.error(err);
  const database = client.db('image-search-api');
  require('./app/routes')(app, database);

  app.listen(port, () => {
    console.log("We are live on " + port);
  });
});
