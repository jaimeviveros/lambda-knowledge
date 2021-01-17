'use strict';

var validate = require('uuid-validate');

const UserSchema = require('../schemas/User');

module.exports.handler = async (event, context, callback) => {
    const model = UserSchema.model();
    //
    let userFound = undefined;
    let success = true;
    //
    const id = event.pathParameters.id;
    //
    if (validate(id) !== true) {
        console.log("El ID no es correcto: " + id);
        success = false;
    }
    else {
        try {
            userFound = await model.get(id);
            if (!userFound) {
                console.log("No se encontro ningun registro.");
                success = false;
            }
        }
        catch (error) {
            console.log("Error al leer los datos de usuario.");
            console.log("Stacktrace: \n" + error);
            success = false;
        }
    }
    //
    const response = JSON.stringify({
        user: userFound,
        success, 
        in: true
    });
    //
    callback(null, {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: response
    })
};