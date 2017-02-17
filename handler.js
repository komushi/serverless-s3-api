'use strict';

const getObject = require('./handlers/get-object.js');
const putObject = require('./handlers/put-object.js');


function makeGetResponse(error, result) {
  const statusCode = error && error.statusCode || 200
  return {
    statusCode,
    headers: {
      // "Access-Control-Allow-Origin" : "*",
      "Content-Type": "application/pdf"
    },
    isBase64Encoded: true,
    body: result.toString("base64")
  }
}

function makeGetResponse1(error, result) {
  console.log("result.length:" + result.length);
  const statusCode = error && error.statusCode || 200
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Content-Type": "application/octet-stream",
      "Content-Transfer-Encoding": "binary",
      'Content-Length': result.length
    },
    isBase64Encoded: false,
    body: result
  }
}

function makeResponse(error, result) {
  const statusCode = error && error.statusCode || 200
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
