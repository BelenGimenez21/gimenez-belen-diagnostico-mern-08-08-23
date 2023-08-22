const mongoose = require('mongoose');

const URI_MONGODB = 'mongodb://localhost:27017/tareas';

const dbConnect = () => {
    try {
        mongoose.connect(URI_MONGODB, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Base de datos conectada')
    } catch (error) {
        console.log('Error al conectar la base de datos', error.message)
    }
};
mongoose.set('strictQuery', false);

module.exports = dbConnect;