const sequelize = require('sequelize');

const sequelizeConn = new sequelize('productos_tutorial', 'miler', '', {
    host: 'localhost',
    dialect: 'mariadb',
    // port: 3306,
    // logging: false // Esto nos permite deshabilitar la visualización de las consultas a la base de datos desde la consola
})

module.exports = sequelizeConn;