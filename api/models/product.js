const { Sequelize } = require('sequelize');
const sequelize = require('../db/connection');

const Product = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false // optional, prevents null values
    },
    descripcion: {
        type: Sequelize.TEXT, // for longer content
        allowNull: false
    },
    precio: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}/* , {
    createdAt: false,
    updatedAt: false
} */);

module.exports = Product;