<?php
header('Content-Type: application/json');
require_once("conexao.php");

if (!isset($_POST['idPerfil'])) {
    echo json_encode([
        'success' => false,
        'error' => 'idPerfil não informado'
    ]);
    exit;
}

$id = (int) $_POST['idPerfil'];

$bd = new BD();
$conexao = $bd->criarConexao();

// Usuário
$queryUsuario = "SELECT idUsu, nome, descricao FROM usuario WHERE idUsu = $id";
$resUsuario = mysqli_query($conexao, $queryUsuario);
$usuario = mysqli_fetch_assoc($resUsuario);

if (!$usuario) {
    echo json_encode([
        'success' => false,
        'error' => 'Usuário não encontrado'
    ]);
    exit;
}

// Obras
$queryObras = "
    SELECT * from quadrinho as q WHERE q.fk_Usuario_idUsu = $id
";

$resObras = mysqli_query($conexao, $queryObras);
$obras = [];

while ($row = mysqli_fetch_assoc($resObras)) {
    $obras[] = $row;
}

echo json_encode([
    'success' => true,
    'usuario' => $usuario,
    'obras' => $obras
]);