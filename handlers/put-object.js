const AWS = require('aws-sdk');
const S3 = new AWS.S3();

// works with aws mode with Binary Support on
/*
module.exports = (event, callback) => {
  console.log("event!!");
  console.log("event!!");
  console.log("event!!");
  console.log(event);
  var buffer = new Buffer(event.body, 'base64');
  var key = Date.now().toString();

  var params = 
    {
      Bucket: event.pathParameters.bucket,
      Key: key,
      ContentType: 'application/octet-stream',
      Body: buffer
    };

  S3.putObject(params).promise().then(() => {
    callback(null, key);
  }).catch(function(reason) {
   callback(reason, null);
  });
}


// works with offline mode
module.exports = (event, callback) => {
  console.log("event!!");
  console.log("event!!");
  console.log("event!!");
  console.log(event);
  var arrayBuffer = JSON.parse(event.body)['data'];
  var buffer = new Buffer(arrayBuffer);
  var key = Date.now().toString();

  var params = 
    {
      Bucket: event.pathParameters.bucket,
      Key: key,
      ContentType: 'application/octet-stream',
      Body: buffer
    };

  S3.putObject(params).promise().then(() => {
    callback(null, key);
  }).catch(function(reason) {
   callback(reason, null);
  });
}
*/

// works with offline mode & aws mode
module.exports = (event, callback) => {
  console.log("event!!");
  console.log(event);

  var parseResult = safelyParseJSON(event.body);
  var buffer;
  if (parseResult.isJson) {
    buffer = new Buffer(parseResult.payload['data']);
  } else {
    buffer = new Buffer(event.body, 'base64');
  }
  var key = Date.now().toString();

  var params = 
    {
      Bucket: event.pathParameters.bucket,
      Key: key,
      ContentType: 'application/octet-stream',
      Body: buffer
    };

  S3.putObject(params).promise().then(() => {
    callback(null, JSON.stringify({key: key}));
  }).catch(function(reason) {
   callback(JSON.stringify(reason));
  });
}

function safelyParseJSON (payload) {
  // This function cannot be optimised, it's best to
  // keep it small!
  var parsed;

  try {
    parsed = JSON.parse(payload);
  } catch (e) {
    return {isJson: false, payload: payload};
  }

  return {isJson: true, payload: parsed}; // Could be undefined!
}