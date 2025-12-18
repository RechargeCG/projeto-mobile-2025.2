<?php
header('Content-Type: application/json');
require_once("conexao.php");

if (!isset($_POST['idPerfil'])) {
    echo json_encode(['success' => false, 'error' => 'idPerfil não informado']);
    exit;
}

$id = (int) $_POST['idPerfil'];
$bd = new BD();
$conexao = $bd->criarConexao();

// Consulta Usuário
$queryUsuario = "SELECT idUsu, nome, descricao, fonte_foto FROM usuario WHERE idUsu = $id";
$resUsuario = mysqli_query($conexao, $queryUsuario);
$usuario = mysqli_fetch_assoc($resUsuario);

if (!$usuario) {
    echo json_encode(['success' => false, 'error' => 'Usuário não encontrado']);
    exit;
}

// --- LÓGICA DE CARREGAMENTO DA IMAGEM ---
$urlBase = "http://{$_SERVER['HTTP_HOST']}/SPLQ_Server/"; // Pega o IP/Domínio automaticamente
$caminhoNoBanco = $usuario['fonte_foto']; // Ex: ../bd/usuarios/1/perfil.jpg

// Remove os ".." para criar uma URL válida
$urlLimpa = str_replace('../', '', $caminhoNoBanco);
$imgUrl = $urlBase . $urlLimpa;

// Consulta Obras
$queryObras = "SELECT * from quadrinho WHERE fk_Usuario_idUsu = $id";
$resObras = mysqli_query($conexao, $queryObras);
$obras = [];

while ($row = mysqli_fetch_assoc($resObras)) {
    $obras[] = $row;
}

// Retorno com o campo 'img'
echo json_encode([
    'success' => true,
    'usuario' => $usuario,
    'obras' => $obras,
    'imgUrl' => $imgUrl // Aqui vai a string base64 ou null
]);