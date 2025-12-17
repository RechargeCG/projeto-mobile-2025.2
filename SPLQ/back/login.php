<?php
// ==========================================================
// 1. CONFIGURAÇÃO DE CABEÇALHOS (A parte "Burocrática")
// ==========================================================
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// SE O REACT NATIVE PERGUNTAR "POSSO ENVIAR?", RESPONDE "SIM" E PARA AQUI.
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ==========================================================
// 2. CONEXÃO E LÓGICA
// ==========================================================
require_once("conexao.php");

// Pega os dados
$data = json_decode(file_get_contents("php://input"));

// Verifica se veio vazio
if (empty($data) || !isset($data->email) || !isset($data->senha)) {
    http_response_code(400);
    echo json_encode(array("message" => "Dados incompletos ou JSON inválido."));
    exit();
}

$email = $conexao->real_escape_string($data->email); // Proteção básica
$senha = $data->senha;

// Busca
$sql = "SELECT idUsu, nome, email, senha FROM usuario WHERE email = '$email' LIMIT 1";
$result = $conexao->query($sql);

if ($result && $result->num_rows > 0) {
    $usuario = $result->fetch_assoc();
    
    if (password_verify($senha, $usuario['senha'])) {
        http_response_code(200);
        // Remove a senha antes de enviar de volta
        unset($usuario['senha']);
        echo json_encode(array(
            "message" => "Login realizado com sucesso!",
            "usuario" => $usuario
        ));
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Senha incorreta."));
    }
} else {
    http_response_code(404);
    echo json_encode(array("message" => "E-mail não encontrado."));
}

$conexao->close();
?>
