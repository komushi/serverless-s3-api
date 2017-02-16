const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const fs = require("fs");


module.exports = (event, callback) => {
	var params = 
		{
			Bucket: event.pathParameters.bucket,
			Key: event.pathParameters.key
		};


  S3.getObject(params).promise().then((result) => {
    callback(null, result.Body);
  }).catch(function(reason) {
		callback(reason, null);
	});

//alternatives
/* 
  S3.getObject(params, (err, result) => {
	  if (err) {
	    console.log(err);
	    callback(err, null);
  	} else {
  		callback(null, result.Body);
  	}
	});
*/
}

