<?php
// ==========================================================
// 1. CABEÇALHOS CORS (O "Segredo" para o React Native aceitar)
// ==========================================================
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// SE O NAVEGADOR/CELULAR PERGUNTAR "POSSO ENVIAR?", RESPONDE "SIM" E PARA.
// Isso evita o erro de "CORS Preflight"
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ==========================================================
// 2. CONEXÃO E LÓGICA
// ==========================================================
require_once("conexao.php");

// Pega o JSON enviado pelo React Native
$data = json_decode(file_get_contents("php://input"));

// VALIDAÇÃO BÁSICA: Verifica se os campos existem e não estão vazios
if (
    empty($data) || 
    !isset($data->nome) || 
    !isset($data->email) || 
    !isset($data->senha) || 
    !isset($data->dataNasc)
) {
    http_response_code(400); // Bad Request
    echo json_encode(array("message" => "Preencha todos os campos."));
    exit();
}

$nome = $data->nome;
$email = $data->email;
$senha = $data->senha;
$dataNascInput = $data->dataNasc; // Vem como DD/MM/AAAA

// 1. TRATAMENTO DE DATA (DD/MM/AAAA -> YYYY-MM-DD para o MySQL)
$dataNascMySQL = null;
if (strpos($dataNascInput, '/') !== false) {
    $partes = explode('/', $dataNascInput);
    if (count($partes) == 3) {
        // Inverte para AAAA-MM-DD
        $dataNascMySQL = $partes[2] . '-' . $partes[1] . '-' . $partes[0];
    }
}

if (!$dataNascMySQL) {
    http_response_code(400);
    echo json_encode(array("message" => "Data inválida. Use o formato DD/MM/AAAA."));
    exit();
}

// 2. VERIFICA SE O E-MAIL JÁ EXISTE
$stmtCheck = $conexao->prepare("SELECT idUsu FROM usuario WHERE email = ?");
$stmtCheck->bind_param("s", $email);
$stmtCheck->execute();
$stmtCheck->store_result();

if ($stmtCheck->num_rows > 0) {
    http_response_code(409); // Conflict (Conflito)
    echo json_encode(array("message" => "Este e-mail já está cadastrado."));
    $stmtCheck->close();
    exit();
}
$stmtCheck->close();

// 3. CRIPTOGRAFA A SENHA E SALVA
$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

$stmtInsert = $conexao->prepare("INSERT INTO usuario (nome, email, senha, data_nascimento) VALUES (?, ?, ?, ?)");
$stmtInsert->bind_param("ssss", $nome, $email, $senhaHash, $dataNascMySQL);

if ($stmtInsert->execute()) {
    http_response_code(201); // Created
    echo json_encode(array(
        "message" => "Cadastro realizado com sucesso!",
        "id" => $stmtInsert->insert_id
    ));
} else {
    http_response_code(500); // Server Error
    echo json_encode(array("message" => "Erro no servidor ao tentar cadastrar."));
}

$stmtInsert->close();
$conexao->close();
?>
