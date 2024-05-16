const express = require('express');
const router = express.Router();


// Route file
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'We are at /products page with GET'
    })
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: 'We are at /products page with POST',
        product: product
    });
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