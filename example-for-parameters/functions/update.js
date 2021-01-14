'use strict';

var validate = require('uuid-validate');

const {
    USERS_TABLE,
    DYNAMODB_CONF
} = require('../conf/connections');

module.exports.handler = async (event, context, callback) => {
    // obtenemos datos enviados
    const body = JSON.parse(event.body);
    const { id, name, lastname } = body;
    //
    let success = true;
    // si el id no es valido no intentamos actualizar
    if (validate(id) !== true) {
        console.log("El ID no es correcto: " + id);
        success = false;
    }
    else {
        // configuramos la actualizacion
        const params = {
            TableName: USERS_TABLE,
            Key: {
                "id": id
            },
            UpdateExpression: "set #exp_name = :1, lastname = :2",
            ExpressionAttributeNames: {
                "#exp_name": "name"
            },
            ExpressionAttributeValues: {
                ":1": name,
                ":2": lastname
            }
        };
        // generamos la actualizacion; en caso de error capturamos en catch
        try {
            await DYNAMODB_CONF.update(params).promise();
        }
        catch (error) {
            console.log("Error al actualizar el registro.");
            console.log("Stacktrace: \n" + error);
            success = false;
        }
    }
    // El error se ve reflejado en el tag error.
    const response = JSON.stringify({
        success
    });
    // si llegamos a este punto la respuesta siempre es con codigo 200. 
    callback(null, {
        statusCode: 200,
        body: response
    });
};