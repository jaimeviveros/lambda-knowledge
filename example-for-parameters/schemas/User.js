
const dynamoose = require('dynamoose');

const IS_OFFLINE = process.env.IS_OFFLINE;
const USERS_TABLE = process.env.USERS_TABLE;
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
const condition = () => new dynamoose.Condition();
const model = () => dynamoose.model(USERS_TABLE, schema, { "create": false });
//
module.exports = {
    condition,
    model
}