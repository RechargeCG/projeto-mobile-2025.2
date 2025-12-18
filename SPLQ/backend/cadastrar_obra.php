<?php
header('Content-Type: application/json');

// Configurações de conexão - Ajuste conforme seu ambiente
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "nome_do_seu_banco";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    echo json_encode(["sucesso" => false, "mensagem" => "Falha na conexão: " . $conn->connect_error]);
    exit;
}

// Recebendo dados do FormData do React Native
$nome = $_POST['nome'] ?? '';
$autor = $_POST['autor'] ?? '';
$editora = $_POST['editora'] ?? '';
$descricao = $_POST['descricao'] ?? '';
$tags = $_POST['tags'] ?? '';
$idUsu = $_POST['idUsu'] ?? '';

// Validação básica
if (empty($nome) || empty($autor) || empty($idUsu)) {
    echo json_encode(["sucesso" => false, "mensagem" => "Campos obrigatórios ausentes."]);
    exit;
}

// Preparar a Query (Note que fonte_capa está vazio pois o upload de imagem exigiria lógica extra)
$stmt = $conn->prepare("INSERT INTO Quadrinho (nome, autor, editora, descricao, tag, status, fk_Usuario_idUsu, fonte_capa) VALUES (?, ?, ?, ?, ?, 1, ?, 'capa_padrao.png')");
$stmt->bind_param("sssssi", $nome, $autor, $editora, $descricao, $tags, $idUsu);

if ($stmt->execute()) {
    echo json_encode(["sucesso" => true, "mensagem" => "Obra cadastrada com sucesso!"]);
} else {
    echo json_encode(["sucesso" => false, "mensagem" => "Erro ao salvar no banco: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>