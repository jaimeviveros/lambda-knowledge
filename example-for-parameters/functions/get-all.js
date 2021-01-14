'use strict';

const {
    USERS_TABLE,
    DYNAMODB_CONF
} = require('../conf/connections');

module.exports.handler = async (event, context, callback) => {
    const params = {
        TableName: USERS_TABLE,
    };
    //
    let items = [];
    let success = true;
    try {
        items = await DYNAMODB_CONF.scan(params).promise();
    }
    catch (error) {
        console.log("Error al leer los datos de usuario.");
        console.log("Stacktrace: \n" + error);
        success = false;
    }
    //
    const response = JSON.stringify({
        items: items.Items,
        success
    });
    //
    callback(null, {
        statusCode: 200,
        body: response
    })
};