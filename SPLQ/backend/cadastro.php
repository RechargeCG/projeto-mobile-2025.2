<?php
// 1. Headers para evitar erro de CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

// 2. Receber dados (React Native envia JSON ou FormData, vamos preparar para FormData que é o que usaste no Login)
include 'conexao.php';

// Verifica se veio dados via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha']; 
    $dataNasc = $_POST['data_nascimento']; // Vem DD/MM/AAAA

    // Conversão de Data (DD/MM/AAAA -> YYYY-MM-DD)
    if(strpos($dataNasc, '/') !== false){
        $partes = explode('/', $dataNasc);
        if(count($partes) == 3){
            $dataNasc = $partes[2] . '-' . $partes[1] . '-' . $partes[0];
        }
    }

    try {
        // 3. Inserir no Banco
        $sql = "INSERT INTO Usuario (nome, email, senha, data_nascimento) VALUES (:nome, :email, :senha, :data)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':senha', $senha); // Idealmente usaria password_hash(), mas vamos manter simples por enquanto
        $stmt->bindParam(':data', $dataNasc);
        $stmt->execute();

        // 4. Pegar o ID gerado
        $idNovoUsuario = $conn->lastInsertId();

        // 5. Criar a estrutura de pastas
        // Vamos supor que a pasta "Usuarios" fica um nível acima da pasta "backend"
        $pastaUsuario = "../Usuarios/" . $idNovoUsuario . "/quadrinhos";

        // Cria a pasta recursivamente (o true permite criar pastas aninhadas)
        if (!file_exists($pastaUsuario)) {
            mkdir($pastaUsuario, 0777, true); 
        }

        echo json_encode(["sucesso" => true, "mensagem" => "Cadastro realizado e pasta criada!", "id" => $idNovoUsuario]);

    } catch (PDOException $e) {
        echo json_encode(["erro" => "Erro ao cadastrar: " . $e->getMessage()]);
    }

} else {
    echo json_encode(["erro" => "Método não permitido"]);
}
?>