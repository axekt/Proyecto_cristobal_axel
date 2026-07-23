const express = require('express');
const app = express();
const path = require('path');

// Permite leer los datos enviados desde formularios HTML (POST)
app.use(express.urlencoded({ extended: true }));

// Indica a Express dónde están tus archivos estáticos (HTML y CSS)
app.use(express.static(__dirname));

// Ruta principal: envía el archivo index.html cuando el usuario entra a la web
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para procesar el inicio de sesión
app.post('/login', (req, res) => {
    const usuario = req.body.nombre;
    const password = req.body.password;

    if (usuario === "admin" && password === "12345") {
        res.sendFile(path.join(__dirname, 'test2.html'));
    } else {
        // En lugar de res.send, enviamos el nuevo archivo HTML
        res.sendFile(path.join(__dirname, 'denegado.html'));
    }
});

// Levantar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});