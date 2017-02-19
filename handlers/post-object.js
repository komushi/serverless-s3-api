const AWS = require('aws-sdk');
const S3 = new AWS.S3();

// works with offline mode & aws mode
module.exports = (event, callback) => {
  console.log("post event!!");
  console.log(event);

  var parseResult = safelyParseJSON(event.body);
  var buffer;
  if (parseResult.isJson) {
    buffer = new Buffer(parseResult.payload['data']);
  } else {
    buffer = new Buffer(event.body, 'base64');
  }

  var params = 
    {
      Bucket: event.pathParameters.bucket,
      Key: event.pathParameters.key,
      ContentType: 'application/octet-stream',
      Body: buffer
    };

  S3.putObject(params).promise().then(() => {
    console.log("postobject ok");
    callback(null, JSON.stringify({key: event.pathParameters.key}));
  }).catch(function(reason) {
    console.log("postobject ng");
    console.log(reason);
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