'use strict';

const getObject = require('./handlers/get-object.js');
const putObject = require('./handlers/put-object.js');
const postObject = require('./handlers/post-object.js');


function makeGetResponse(error, result) {
  const statusCode = error && error.statusCode || 200;

  var str = result || '';

  return {
    statusCode,
    headers: {
      // "Access-Control-Allow-Origin" : "*",
      "Content-Type": "application/octet-stream"
    },
    isBase64Encoded: true,
    body: str.toString("base64")
  }
}

function makeResponse(error, result) {
  const statusCode = error && error.statusCode || 200;
  return {
    statusCode,
    headers: {
      // "Access-Control-Allow-Origin" : "*",
      "Content-Type": "application/json"
    },
    body: result
  }
}

module.exports.getObject = (event, context, callback) => {
  getObject(event, (error, result) => {
    const response = makeGetResponse(error, result)
    context.succeed(response)
  });
};

module.exports.putObject = (event, context, callback) => {
  putObject(event, (error, result) => {
    const response = makeResponse(error, result)
    context.succeed(response)
  });
};

module.exports.postObject = (event, context, callback) => {
  postObject(event, (error, result) => {
    const response = makeResponse(error, result)
    context.succeed(response)
  });
};
