// Importa las dependencias
const express = require('express');
const app = express();  // Ejecuta la función express y lo guardamos en la variable app
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mariadb = require('mariadb');

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

// Conexión con la base de datos (hace falta la dependencia mariabd)
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'miler',
    password: ''
});

// Esta función lo único que hace es comprobar el correcto funcionamiento de una conexión a la base de datos.
pool.getConnection(error => {
    if(error) throw error;
    console.log('Conexión exitosa a la base de datos');
    connection.release();   // Liberamos la conexión usada, para no tener abierta la conexión de manera indefinida.
});

app.use(morgan('dev'));
// Elegimos qué es lo que vamos a parsear, en este caso urls y json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// CORS
/*
Tutorial en el que se explica todo esto:
(Parsing the Body & Handling CORS | Creating a REST API with Node.js)
https://www.youtube.com/watch?v=zoSJ3bNGPp0&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q&index=5
*/
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


// Rutas
app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);


// Error handling 
/* Si no se han usado ni la ruta /orders, ni la ruta /products, entonces este código se ejecutará. De lo contrario no se mostrará este mensaje de error.
También, si no se ha realizado correctamente alguna parte del código, también seguiría ejecutando el código, por lo que la segunda función recoge ese error. */
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;