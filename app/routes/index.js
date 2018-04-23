const imageRoutes = require('./image_routes');

module.exports = function(app, db) {
  imageRoutes(app, db);
};
