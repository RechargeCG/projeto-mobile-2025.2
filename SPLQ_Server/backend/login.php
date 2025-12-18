<?php
// 1. Headers obrigatórios para o Expo conseguir ler
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

require('conexao.php');

$conexao = new BD();
$conexao = $conexao->criarConexao();

// Verifica se é POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Recebe os dados (pode vir via FormData ou JSON raw)
    $email = $_POST['email'] ?? '';
    $senha = $_POST['senha'] ?? '';

    if(empty($email) || empty($senha)){
        echo json_encode(["sucesso" => false, "erro" => "Preencha email e senha!"]);
        exit;
    }

    try {
        // 2. Consulta no Banco (Verificação simples de texto plano conforme seu cadastro)
        // OBS: Num cenário real, usaríamos password_verify() com hash
        $sql = "SELECT idUsu, senha, nome FROM Usuario WHERE email = '$email' LIMIT 1";
        $res = mysqli_fetch_assoc(mysqli_query($conexao,$sql));

        if(password_verify($senha,$res['senha'])){
            // Login com sucesso
            echo json_encode([
                "sucesso" => true,
                "idUsu" => $res['idUsu'],
                "nome" => $res['nome']
            ]);
        } else {
            // Login falhou
            echo json_encode(["sucesso" => false, "erro" => "Email ou senha incorretos."]);
        }

    } catch (PDOException $e) {
        echo json_encode(["sucesso" => false, "erro" => "Erro no servidor: " . $e->getMessage()]);
    }

} else {
    echo json_encode(["sucesso" => false, "erro" => "Método inválido"]);
}
?>
