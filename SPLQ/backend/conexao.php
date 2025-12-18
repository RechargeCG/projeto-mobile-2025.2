<?php
// Configurações do Banco
$host = "localhost";
$user = "root"; // Seu usuário do MySQL
$pass = "";     // Sua senha do MySQL
$db   = "NOME_DO_TEU_BANCO"; // Coloque o nome exato que criou no SQL

try {
    $conn = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    // Se der erro, retorna JSON para o app não ficar "carregando" pra sempre
    echo json_encode(["erro" => "Erro na conexão: " . $e->getMessage()]);
    exit;
}
?>