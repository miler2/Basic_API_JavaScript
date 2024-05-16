// Esto son las dependencias, es como importar en typescript
const http = require('http');
const app = require('./app');

// Aquí las tuberías significan que si la variable PORT no está puesta por defecto a algún valor, le asignamos el 3000
const port = process.env.PORT || 3000;

const server = http.createServer(app);

// Esto activa el servidor
server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`)
});