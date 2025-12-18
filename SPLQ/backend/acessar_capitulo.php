<?php
    //Cria conexão com o banco de dados
    session_start();
    require_once("conexao.php");
	$conexao = new BD();
	$conexao = $conexao->criarConexao();

    if(!isset($_SESSION['id'])){
        header("Location: ../pages/login");
        exit();
    }

    //Obtém dados básicos de id do usuário e dados do capitulo
    $idUsu = $_SESSION['id'];
    $_SESSION['foto'] = mysqli_fetch_assoc(mysqli_query($conexao, "SELECT fonte_foto FROM Usuario WHERE idUsu = {$idUsu}"))['fonte_foto'];
    $idQua = $_SESSION['idQua'];
    $capitulos = "SELECT numCap FROM Capitulo WHERE fk_Quadrinho_idQua = {$idQua} ORDER BY numCap ASC";
    $capitulos = mysqli_query($conexao, $capitulos);
    $_SESSION['capitulos'] = array();
    while($res = mysqli_fetch_assoc($capitulos)['numCap'])
        array_push($_SESSION['capitulos'],$res);
    var_dump($_SESSION['capitulos']);
    $numCap = $_POST['cap'] ?? $_SESSION['cap'];
    $_SESSION['cap']=$numCap;

    //echo $numCap;

    $query = "SELECT idCap FROM Capitulo WHERE fk_Quadrinho_idQua = {$idQua} AND numCap = {$numCap} LIMIT 1";
    $idCap = mysqli_fetch_assoc(mysqli_query($conexao, $query))['idCap'];
    
    //Define a fonte e o número do capítulo a serem exibidos na página de leitura
    $query = "SELECT fonte FROM Capitulo WHERE fk_Quadrinho_idQua = {$idQua} AND idCap = {$idCap} LIMIT 1";
    $fonte = mysqli_fetch_assoc(mysqli_query($conexao, $query));
    $_SESSION['cbz'] = $fonte['fonte'];
    $_SESSION['capitulo'] = $numCap;

    //Obtém dados para a exibição dos comentários na página de leitura
    $query = "SELECT Usuario.idUsu, Usuario.nome, Usuario.fonte_foto, Comentario.texto, Comentario.idCom FROM Comentario JOIN Usuario ON Comentario.fk_Usuario_idUsu = Usuario.idUsu WHERE Comentario.fk_Capitulo_idCap = $idCap ORDER BY idCom ASC";
    $query = mysqli_query($conexao, $query);
    $_SESSION['comentarios'] = array();
    while($resultado = mysqli_fetch_assoc($query))
        array_push($_SESSION['comentarios'],$resultado);

    //Incrementa o número de visualizações do capítulo
    mysqli_query($conexao, "UPDATE Capitulo SET visualizacao = visualizacao + 1 WHERE idCap = $idCap;");

    //Adiciona ou atualiza no histórico o capítulo e sua data e hora de acesso
    $verifica = mysqli_query($conexao, "SELECT 1 FROM Historico WHERE fk_Usuario_idUsu = $idUsu AND fk_Capitulo_idCap = $idCap");
    if (mysqli_num_rows($verifica) === 0)
        mysqli_query($conexao, "INSERT INTO Historico (fk_Usuario_idUsu, fk_Capitulo_idCap, data) VALUES ($idUsu, $idCap, CURRENT_TIMESTAMP)");
    else
        mysqli_query($conexao, "UPDATE Historico SET data = CURRENT_TIMESTAMP WHERE fk_Usuario_idUsu = $idUsu AND fk_Capitulo_idCap = $idCap");

    header('Location: ../pages/capitulo');
    exit();
?>