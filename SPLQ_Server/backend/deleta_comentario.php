<?php
    //Cria conexão com o banco de dados
    session_start();
    require_once("conexao.php");
    $conexao = new BD();
    $conexao = $conexao->criarConexao();
    
    $idCom = $_POST['idCom'];

    //Confirma se quem está deletando é o usuário criador do quadrinho
    if($_SESSION['id'] != mysqli_fetch_assoc(mysqli_query($conexao, "SELECT fk_Usuario_idUsu FROM Comentario WHERE idCom = {$idCom}"))['fk_Usuario_idUsu']){
        header("Location: acessa_capitulo.php");
        exit();
    }

    //Efetivamente deleta o comentário do banco de dados
    mysqli_query($conexao, "DELETE FROM Comentario WHERE idCom = {$idCom}");

    header("Location: acessa_capitulo.php");
    exit();
?>