'use strict';

const {
    USERS_TABLE,
    DYNAMODB_CONF
} = require('../conf/connections');

module.exports.handler = async (event, context, callback) => {
    const params = {
        TableName: USERS_TABLE,
        Key: {
            id: event.pathParameters.id
        }
    };
    //
    let user = {};
    let success = true;
    try {
        const search = await DYNAMODB_CONF.get(params).promise();
        if (search !== undefined && search.Item !== null) {
            const item = search.Item;
            user.name = item.name;
            user.lastname = item.lastname;
        }
        else {
            console.log("No se encontro ningun registro.");
            success = false;
        }
    }
    catch (error) {
        console.log("Error al leer los datos de usuario.");
        console.log("Stacktrace: \n" + error);
        success = false;
    }
    //
    const response = JSON.stringify({
        user,
        success
    });
    //
    callback(null, {
        statusCode: 200,
        body: response
    })
};