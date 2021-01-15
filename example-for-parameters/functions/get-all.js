'use strict';

const User = require('../schemas/User');

module.exports.handler = async (event, context, callback) => {
    const model = User.model()
    //
    let items = undefined;
    let success = true;
    try {
        items = await model.scan().exec();
    }
    catch (error) {
        console.log("Error al leer los datos de usuario.");
        console.log("Stacktrace: \n" + error);
        success = false;
    }
    //
    const response = JSON.stringify({
        items,
        success
    });
    //
    callback(null, {
        statusCode: 200,
        body: response
    })
};