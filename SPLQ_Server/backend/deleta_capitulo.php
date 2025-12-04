<?php
    //Cria conexão com o banco de dados
    session_start();
    require_once("conexao.php");
    $conexao = new BD();
    $conexao = $conexao->criarConexao();
    
    $idQua = $_SESSION['idQua'];

    //Confirma se quem está deletando é o usuário criador do quadrinho
    if($_SESSION['id'] != mysqli_fetch_assoc(mysqli_query($conexao, "SELECT fk_Usuario_idUsu FROM Quadrinho WHERE idQua = {$idQua}"))['fk_Usuario_idUsu']){
        header("Location: ../pages/manga");
        exit();
    }

    //Remove o capítulo do servidor de arquivos e consequentemente do banco de dados
    $numCap = $_POST['numCap'];
    $fonte = mysqli_fetch_assoc(mysqli_query($conexao, "SELECT fonte FROM Capitulo WHERE fk_Quadrinho_idQua = {$idQua} AND numCap = {$numCap}"))['fonte'];
    $fonte = explode("../",$fonte);
    $fonte = "../".$fonte[2];
    //echo $fonte;
    if(unlink($fonte))
        mysqli_query($conexao, "DELETE FROM Capitulo WHERE fk_Quadrinho_idQua = {$idQua} AND numCap = {$numCap}");
        
    header("Location: acessa_quadrinho.php");
    exit();
?>