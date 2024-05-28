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
    try {
        const connection = await pool.getConnection();
        const rows = await connection.query(`SELECT * FROM productos`);
        connection.release();
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error connecting to database' });
    }
});

router.post('/', async (req, res, next) => {
    const product = new Product({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock
    })

    try {
        const connection = await pool.getConnection();
        const rows = await connection.query(`INSERT INTO productos VALUES(NULL, "${product.nombre}", "${product.descripcion}", ${product.precio}, ${product.stock})`);
        connection.release();
        res.status(200).json({
            message: 'El producto se ha añadido correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding products to database' });
    }
});


// Con id
router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    
    try {
        const connection = await pool.getConnection();
        const rows = await connection.query(`SELECT * FROM productos WHERE id=${id}`);
        connection.release();
        if (rows) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({message: 'The product selected does not exist'})
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error connecting to database' });
    }
});

router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: 'Se ha cambiado el producto!'
    });
});

module.exports = router;