const express = require('express');
const cors = require('cors');
const dbConnect = require('./src/db/db.connection');

const port = 5000;

const app = express();
dbConnect();

app.use(cors())
app.use(express.json());

//importacion de rutas
app.use(require('./src/routes/task.routes'));

//puerto
app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));