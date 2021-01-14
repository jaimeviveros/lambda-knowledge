const AWS = require('aws-sdk');
const USERS_TABLE = process.env.USERS_TABLE;
const IS_OFFLINE = process.env.IS_OFFLINE;
let dynamoDB;

if (IS_OFFLINE === 'true') {
  dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  });
} 
else {
  dynamoDB = new AWS.DynamoDB.DocumentClient();
}

module.exports = {
    USERS_TABLE,
    IS_OFFLINE,
    DYNAMODB_CONF: dynamoDB,
    AWS
};