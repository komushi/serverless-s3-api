const AWS = require('aws-sdk');
const S3 = new AWS.S3();

module.exports = (event, callback) => {
  var str = JSON.parse(event.body)['file']['data'];
  var buffer = new Buffer(str);

	var params = 
		{
			Bucket: event.pathParameters.bucket,
			Key: Date.now().toString(),
      ContentType: 'application/octet-stream',
      Body: buffer
		};

  S3.putObject(params).promise().then((result) => {
    callback(null, result);
  }).catch(function(reason) {
   callback(reason, null);
  });
}


