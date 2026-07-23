<?php
session_start();

include 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nombre = $_POST['nombre'];
    $clave_ingresada = $_POST['clave'];

    $sql = "SELECT * FROM usuarios WHERE nombre = '$nombre'";
    $resultado = $conexion->query($sql);

    if ($resultado->num_rows > 0) {
 
        $usuario_db = $resultado->fetch_assoc();

        if (password_verify($clave_ingresada, $usuario_db['clave'])) {
            
            $_SESSION['usuario_activo'] = $usuario_db['nombre'];
            
            header("Location: test2.html");
            exit();

        } else {
            echo "<script>
                    alert('Contraseña incorrecta. Inténtalo de nuevo.');
                    window.location.href = 'index.html';
                  </script>";
        }
    } else {
        echo "<script>
                alert('El usuario no existe. Por favor, regístrate primero.');
                window.location.href = 'index.html';
              </script>";
    }

    $conexion->close();
}
?>