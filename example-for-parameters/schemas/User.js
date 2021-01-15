
const dynamoose = require('dynamoose');

const IS_OFFLINE = process.env.IS_OFFLINE;
const NEW_USERS_TABLE = process.env.NEW_USERS_TABLE;
//
if (IS_OFFLINE === 'true') {
    dynamoose.aws.ddb.local('http://localhost:8000');
} 
//
const fields = {
    "id": String,
    "name": String,
    "lastname": String,
    "email": String,
}
//
const options = {
    "saveUnknown": false,
    "timestamps": {
        "createdAt": "createDate",
        "updatedAt": null
    }
}
//
const schema = new dynamoose.Schema(fields, options);
//
const model = () => dynamoose.model(NEW_USERS_TABLE, schema);
//
module.exports = {
    model
}