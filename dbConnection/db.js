const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  endpoint: process.env.ENDPOINT
});

const dynamoDB = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

module.exports = dynamoDB;