'use strict';

var validate = require('uuid-validate');

const UserSchema = require('../schemas/User');

module.exports.handler = async (event, context, callback) => {
    const model = UserSchema.model();
    const condition = UserSchema.condition();
    // obtenemos datos enviados
    const body = JSON.parse(event.body);
    const { id } = body;
    //
    let success = true;
    // si el id no es valido no intentamos actualizar
    if (validate(id) !== true) {
        console.log("El ID no es correcto: " + id);
        success = false;
    }
    else {
        // generamos la actualizacion; en caso de error capturamos en catch
        try {
            const filter = {
                id
            };
            //
            const { dataToUpdate } = await configDataToUpdate(body);
            // solo actualizaremos un registro con ID existente
            const conditionOnlyIfExist = { 
                "condition": condition.filter("id").exists()
            };
            //
            await model.update(filter, dataToUpdate, conditionOnlyIfExist);
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

const configDataToUpdate = (body) => {
    const dataToUpdate = {};
    //
    const { name, lastname, email } = body;
    //
    if (isNotEmpty(name))
        dataToUpdate.name = name;
    //
    if (isNotEmpty(lastname))
        dataToUpdate.lastname = lastname;
    //
    if (isNotEmpty(email))
        dataToUpdate.email = email;
    //
    if (Object.keys(dataToUpdate).length < 1) {
        return Promise.reject({
            message: 'Nada para actualizar'
        });
    }
    else {
        return Promise.resolve({
            dataToUpdate
        });
    }
};

const isNotEmpty = (string) => {
    const isNotValid = string === undefined
        || string === null;
    //
    return !isNotValid;
};