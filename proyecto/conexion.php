<?php

$servidor = "localhost";
$usuario_db = "root";
$clave_db = "";
$nombre_bd = "sistema_db";

$conexion = new mysqli($servidor, $usuario_db, $clave_db, $nombre_bd);

if($conexion ->connect_error){
    die("Error de conexion: " . $conexion->connect_eror);
}
?>