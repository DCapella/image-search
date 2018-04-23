module.exports.getDetails = (req) => {
  let reqName = req.params[0];
  let reqNumber = 1;
  if (Object.keys(req.query).length) {
    reqNumber = req.query['offset'];
  }
  let output = { searchName: reqName, searchNumber: reqNumber };
  return output;
};

module.exports.imagesSort = (searchDetails, images) => {
  let output = [];
  for (var i = 0; i < searchDetails['searchNumber']; i++) {
    let url = images[i]["url"];
    let altText = images[i]["description"];
    let thumbnail = images[i]["thumbnail"]["url"];
    let context = images[i]["parentPage"];
    output.push({
      'URL': url,
      'Text': altText,
      'Thumbnail': thumbnail,
      'Context': context
    });
  }
  return output;
};

module.exports.getRecents = (collection) => {
  return new Promise((fufill, reject) => {
    collection.toArray();
  });
};
