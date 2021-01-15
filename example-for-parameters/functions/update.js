'use strict';

var validate = require('uuid-validate');

const UserSchema = require('../schemas/User');

module.exports.handler = async (event, context, callback) => {
    const model = UserSchema.model();
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
        const filter = {
            id
        };
        //
        const dataToUpdate = {
            name, lastname
        };
        // generamos la actualizacion; en caso de error capturamos en catch
        try {
            await model.update(filter, dataToUpdate);
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

const configData = (body) => {
    const dataToUpdate = {};
    //
    const { name, lastname, email } = body;
    //
    if (name !== null)
        dataToUpdate.name = name;
    //
    if (lastname !== null)
        dataToUpdate.lastname = lastname;
    //
    if (email !== null)
        dataToUpdate.email = email;
};