<?php
header('Content-Type: application/json');

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "nome_do_seu_banco";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "Falha na conexão"]);
    exit;
}

// Recebendo dados
$idQua = $_POST['idQua'] ?? '';
$nome = $_POST['nome'] ?? '';
$autor = $_POST['autor'] ?? '';
$editora = $_POST['editora'] ?? '';
$descricao = $_POST['descricao'] ?? '';
$tags = $_POST['tags'] ?? '';
$idUsu = $_POST['idUsu'] ?? '';

if (empty($idQua) || empty($nome) || empty($autor)) {
    echo json_encode(["success" => false, "error" => "Dados insuficientes para atualização."]);
    exit;
}

// Atualizar a obra
// A cláusula WHERE inclui fk_Usuario_idUsu por segurança (garantir que o dono está editando)
$sql = "UPDATE Quadrinho SET nome = ?, autor = ?, editora = ?, descricao = ?, tag = ? WHERE idQua = ? AND fk_Usuario_idUsu = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssii", $nome, $autor, $editora, $descricao, $tags, $idQua, $idUsu);

if ($stmt->execute()) {
    if ($stmt->affected_rows >= 0) {
        echo json_encode(["success" => true, "mensagem" => "Obra atualizada com sucesso!"]);
    } else {
        echo json_encode(["success" => false, "error" => "Nenhuma alteração realizada ou obra não encontrada."]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Erro ao atualizar: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>