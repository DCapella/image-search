const GoogleImages = require('google-images');
const utils = require('../library/utils');
const GI = require('../../config/googleInfo.js');

const client = new GoogleImages(GI.CSE_ID, GI.API_KEY);

module.exports = function(app, db) {
  const collection = db.collection('recents');
  const sendError = { "Error": "An error has occured!" };

  app.get('/', (req, res) => {
    res.sendFile('index.html', {
      root: './public/views'
    });
  });

  app.get('/recents', (req, res) => {
    collection.find({}, {
      projection: { "_id": 0 }
    }).sort({
      "time": -1
    }).toArray((err, result) => {
      res.send(err ? sendError : result);
    });
  });

  app.get('/imagesearch/*', (req, res) => {
    const searchDetails = utils.getDetails(req);
    const recentDetails = { 'term': req.params[0], 'time': new Date() };
    collection.insert(recentDetails, (err, result) => {
      if (err) {
        res.send(sendError);
      };
    });
    client.search(searchDetails['searchName']).then((images) => {
      let output = utils.imagesSort(searchDetails, images);
      res.send(output);
    });
  });

};
