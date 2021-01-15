
const User = require('../schemas/User');

module.exports.handler3 = async (event, context, callback) => {
    const data = {
        "id": "123",
        "name": "Ale",
        "lastname": "Viveros",
        "email": "mail"
    }
    //
    const newUser = User.model();
    let success = true;
    //
    try {
        await newUser.create(data);
        console.log("Save operation was successful.");
    } catch (error) {
        console.error(error);
        success = false;
    }
    const response = JSON.stringify({
        data,
        success
    });
    // si llegamos a este punto la respuesta siempre es con codigo 200. 
    callback(null, {
        statusCode: 200,
        body: response
    });
};


module.exports.handler1 = async (event, context, callback) => {
    // Create a new cat object
    const users = User.model()
    const results = await users.scan().exec();
    // El error se ve reflejado en el tag error.
    const response = JSON.stringify({
        results
    });
    // si llegamos a este punto la respuesta siempre es con codigo 200. 
    callback(null, {
        statusCode: 200,
        body: response
    });
};
