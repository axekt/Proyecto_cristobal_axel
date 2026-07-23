const express = require('express');
const path = require('path');
const mysql = require('mysql2'); // Importamos el conector de MySQL

const app = express();

// --- CONFIGURACIONES ---
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // CRÍTICO: Permite que el servidor entienda el texto del post enviado por JS

// --- CONEXIÓN A BASE DE DATOS (XAMPP) ---
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Usuario de XAMPP por defecto
    password: '',      // XAMPP no tiene contraseña por defecto
    database: 'red_social' // Asegúrate de que así se llame tu BD
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL en XAMPP');
});

// --- RUTAS DE LOGIN ---
app.post('/login', (req, res) => {
    const usuario = req.body.nombre;
    const password = req.body.password;

    if (usuario === "admin" && password === "12345") {
        res.sendFile(path.join(__dirname, 'test2.html'));
    } else {
        res.sendFile(path.join(__dirname, 'denegado.html'));
    }
});


// --- SISTEMA DE PUBLICACIONES (NUEVO) ---

// Endpoint 1: Recibir la nueva publicación cuando presionas el botón
app.post('/api/publicaciones', (req, res) => {
    const { usuario_id, contenido } = req.body; 
    
    const query = 'INSERT INTO publicaciones (usuario_id, contenido) VALUES (?, ?)';
    db.query(query, [usuario_id, contenido], (err, results) => {
        if (err) {
            console.error('Error al guardar en BD:', err);
            return res.status(500).json({ error: 'Error al crear la publicación' });
        }
        // Responde al frontend diciendo que todo salió bien
        res.json({ mensaje: 'Publicación exitosa', id: results.insertId });
    });
});

// Endpoint 2: Enviar todas las publicaciones al feed para que se vean en pantalla
app.get('/api/publicaciones', (req, res) => {
    // Busca las publicaciones y las une con el nombre del autor
    const query = `
        SELECT p.id, p.contenido, p.fecha_publicacion, u.nombre_usuario 
        FROM publicaciones p
        JOIN usuarios u ON p.usuario_id = u.id
        ORDER BY p.fecha_publicacion DESC
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al consultar BD:', err);
            return res.status(500).json({ error: 'Error al obtener publicaciones' });
        }
        res.json(results);
    });
});

// --- INICIAR SERVIDOR ---
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});