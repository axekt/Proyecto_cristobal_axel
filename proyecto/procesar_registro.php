<?php

include 'conexion.php';

if ($_SERVER["REQUEST_METHOD"]== "POST"){

$nombre = $_POST['nombre_usuario'];
$correo = $_POST['correo_usuario'];
$clave_origen = $_POST['clave_usuario'];

$clave_encriptada = password_hash($clave_origen, PASSWORD_DEFAULT);

    $sql = "INSERT INTO usuarios (nombre, correo, clave) VALUES ('$nombre', '$correo', '$clave_encriptada')";

    if ($conexion->query($sql) === TRUE) {
        echo "<script>
                alert('¡Usuario registrado con éxito!');
                window.location.href = 'index.html';
              </script>";
    } else {
        echo "Error al registrar: " . $conexion->error;
    }

$conexion->close();
}
?>