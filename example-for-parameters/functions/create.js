'use strict';

const { v4: uuidv4 } = require('uuid');

const {
    USERS_TABLE,
    DYNAMODB_CONF
} = require('../conf/connections');

module.exports.handler = async (event, context, callback) => {
    // obtenemos datos enviados
    const body = JSON.parse(event.body);
    const { name, lastname } = body;
    // generamos uuid con el que se guardara el registro
    let id = uuidv4();
    console.log("ID: " + id);
    // generamos la data q sera insertada y donde
    const params = {
        TableName: USERS_TABLE,
        Item: {
            id, name, lastname
        }
    };
    // generamos la actualizacion; en caso de error capturamos en catch
    let success = true;
    try {
        await DYNAMODB_CONF.put(params).promise();
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