<?php
// 1. Headers para evitar erro de CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

// 2. Receber dados (React Native envia JSON ou FormData, vamos preparar para FormData que é o que usaste no Login)
require('conexao.php');

$conexao = new BD();
$conexao = $conexao->criarConexao();

// Verifica se veio dados via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = password_hash($_POST['senha'],PASSWORD_DEFAULT); 
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
        $sql = "INSERT INTO Usuario (nome, email, senha, data_nascimento) VALUES ('$nome', '$email', '$senha', '$dataNasc')";
        mysqli_query($conexao,$sql);

        // 4. Pegar o ID gerado

        $idNovoUsuario = mysqli_fetch_assoc(mysqli_query($conexao,"SELECT idUsu FROM Usuario WHERE email = '$email'"))['idUsu'];

        // 5. Criar a estrutura de pastas
        // Vamos supor que a pasta "Usuarios" fica um nível acima da pasta "backend"
        $pastaUsuario = "../bd/usuario/" . $idNovoUsuario;

        // Cria a pasta recursivamente (o true permite criar pastas aninhadas)
        if (!is_dir($pastaUsuario)) {
            mkdir($pastaUsuario, 0777, true); 
        }

        $pastaUsuario = "../bd/usuario/" . $idNovoUsuario . "/quadrinhos";

        // Cria a pasta recursivamente (o true permite criar pastas aninhadas)
        if (!is_dir($pastaUsuario)) {
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
