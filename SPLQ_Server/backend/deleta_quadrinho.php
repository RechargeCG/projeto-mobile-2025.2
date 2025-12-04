<?php
    //Cria conexão com o banco de dados
    session_start();
    require_once("conexao.php");
    $conexao = new BD();
    $conexao = $conexao->criarConexao();
    
    $idQua = $_SESSION['idQua'];

    //Confirma se quem está deletando é o usuário criador do quadrinho
    if($_SESSION['id'] != mysqli_fetch_assoc(mysqli_query($conexao, "SELECT fk_Usuario_idUsu FROM Quadrinho WHERE idQua = {$idQua}"))['fk_Usuario_idUsu']){
        header("Location: acessar_perfil.php");
        exit();
    }

    //Lembrar de apagar o quadrinho do servidor de arquivos

    mysqli_query($conexao, "DELETE FROM Quadrinho WHERE idQua = {$idQua}");
    header("Location: ../pages/perfil");
    exit();
?>