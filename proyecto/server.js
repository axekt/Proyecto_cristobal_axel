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
    // Captura los datos del formulario
    const usuario = req.body.nombre;
    const password = req.body.password; // Actualizado al nuevo nombre

    // Validación estática
    if (usuario === "admin" && password === "12345") {
        res.sendFile(path.join(__dirname, 'test2.html'));
    } else {
        res.send(`
            <h1 style="color:red; text-align:center; font-family:Arial;">Acceso Denegado</h1>
            <p style="text-align:center; font-family:Arial;">Usuario o contraseña incorrectos.</p>
            <div style="text-align:center;"><a href='/'>Volver al inicio</a></div>
        `);
    }
});

// Levantar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});