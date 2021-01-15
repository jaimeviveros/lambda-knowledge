'use strict';

const { v4: uuidv4 } = require('uuid');

const UserSchema = require('../schemas/User');

const {
    USERS_TABLE,
    DYNAMODB_CONF
} = require('../conf/connections');

module.exports.handler = async (event, context, callback) => {
    const model = UserSchema.model();
    // obtenemos datos enviados
    const body = JSON.parse(event.body);
    const { name, lastname, email } = body;
    // generamos uuid con el que se guardara el registro
    let id = uuidv4();
    // generamos el registro; en caso de error capturamos en catch
    let success = true;
    try {
        const user = new model({
            id, name, lastname, email
        });
        await user.save();
    }
    catch (error) {
        console.log("Error al insertar el registro.");
        console.log("Stacktrace: \n" + error);
        success = false;
        id = undefined;
    }
    // El error se ve reflejado en el tag error.
    const response = JSON.stringify({
        id,
        success
    });
    // si llegamos a este punto la respuesta siempre es con codigo 200. 
    callback(null, {
        statusCode: 200,
        body: response
    });
};