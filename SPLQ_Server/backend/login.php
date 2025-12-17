<?php
    session_start();
    require_once("conexao.php");
    $conexao = new BD();
    $conexao = $conexao->criarConexao();

    // Define o cabeçalho para JSON
    header('Content-Type: application/json');    

    if(!isset($_POST['email']) || !isset($_POST['senha']) $_POST['email'] == '' || $_POST['senha'] == '') {
        echo json_encode(["idUsu" => 0, "erro" => "Campos vazios"]);
        exit();
    }

    $email = mysqli_real_escape_string($conexao, $_POST['email']);
    $senha = $_POST['senha']; // Não use escape na senha antes do password_verify

    $query = "SELECT * FROM usuario WHERE email = '$email'";
    $resultado = mysqli_query($conexao, $query);
    
    if($resultado && mysqli_num_rows($resultado) == 1){
        $usuario = mysqli_fetch_assoc($resultado);
        
        if($senha == $usuario['senha']){
            // Sucesso: Retorna o ID
            echo json_encode([
                "idUsu" => (int)$usuario['idUsu'],
                "sucesso" => true
            ]);
            exit();
        }
    }

    // Falha: Retorna ID 0
    echo json_encode([
        "idUsu" => 0,
        "erro" => "Login e/ou senha incorreto(s)"
    ]);
?>