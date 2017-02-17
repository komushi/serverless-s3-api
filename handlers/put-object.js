const AWS = require('aws-sdk');
const S3 = new AWS.S3();

// works with aws mode
module.exports = (event, callback) => {
  console.log("event!!");
  console.log("event!!");
  console.log("event!!");
  console.log(event);
  var buffer = new Buffer(event.body, 'base64');
  // if (typeof Buffer.from === "function") {
  //     // Node 5.10+
  //     buffer = Buffer.from(event.body, 'base64'); // Ta-da
  // } else {
  //     // older Node versions
  //     buffer = new Buffer(event.body, 'base64'); // Ta-da
  // }
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
/*
module.exports = (event, callback) => {
  console.log("event!!");
  console.log("event!!");
  console.log("event!!");
  console.log(event);
  var str = JSON.parse(event.body)['file']['data'];
  var buffer = new Buffer(str);
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