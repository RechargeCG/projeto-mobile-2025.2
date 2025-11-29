<?php
    //Cria conexão com o banco de dados
    session_start();
    require_once("conexao.php");
	$conexao = new BD();
	$conexao = $conexao->criarConexao();

    //Obtém dados básicos do usuário e do capítulo para criar o comentário
    $idUsu = $_SESSION['id'];
    $idQua = $_SESSION['idQua'];
    $comentario = $_POST['comentario'];
    $numCap = $_SESSION['capitulo'] ?? '';
    $query = "SELECT idCap FROM Capitulo WHERE fk_Quadrinho_idQua = {$idQua} AND numCap = {$numCap} LIMIT 1";
    $idCap = mysqli_fetch_assoc(mysqli_query($conexao, $query))['idCap'];
    mysqli_query($conexao, "INSERT INTO Comentario (texto, fk_Capitulo_idCap, fk_Usuario_idUsu) VALUES ('" . mysqli_real_escape_string($conexao, $comentario) . "', $idCap, $idUsu)");
    //echo $_POST['comentario'];

    //Atualiza dados dos comentário da página do capítulo com o comentário adicionado
    $query = "SELECT Usuario.nome, Comentario.texto FROM Comentario JOIN Usuario ON Comentario.fk_Usuario_idUsu = Usuario.idUsu WHERE Comentario.fk_Capitulo_idCap = $idCap";
    $query = mysqli_query($conexao, $query);
    $_SESSION['comentarios'] = array();
    while($resultado = mysqli_fetch_assoc($query))
        array_push($_SESSION['comentarios'],$resultado);

    header('Location: acessa_capitulo.php');
    exit();
?>