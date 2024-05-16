const express = require('express');
const router = express.Router();
const mariadb = require('mariadb');

// Models
const Product = require('../models/product');

// Creamos la variable pool para conexiones a la base de datos.
const pool = mariadb.createPool({
    host: 'localhost',
    database: 'productos_tutorial',
    user: 'miler',
    password: ''
});

// Route file
router.get('/', async (req, res, next) => {
    const connection = await pool.getConnection();
    const rows = await connection.query(`SELECT * FROM productos`);
    connection.release();
    res.json(rows);

    /* res.status(200).json({
        message: 'We are at /products page with GET',
        product: product
    }); */
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'We are at /products page with POST'
    })
});


// Con id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID!',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: 'Se ha cambiado el producto!'
    });
});

module.exports = router;