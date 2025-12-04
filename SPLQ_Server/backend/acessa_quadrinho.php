<?php
    //Cria conexão com o banco de dados
    session_start();
    require_once("conexao.php");
	$conexao = new BD();
	$conexao = $conexao->criarConexao();
    
    //Obtém os dados para exibição da página do quadrinho, com os capítulos publicados e o total de visualizações
    $idQua = $_POST['idQua'] ?? $_SESSION['idQua'];
    $_SESSION['idQua'] = $idQua;
    echo $idQua.'<br>';
    $query = "SELECT * FROM Quadrinho WHERE idQua = {$idQua}";
    $_SESSION['quadrinho'] = mysqli_fetch_assoc(mysqli_query($conexao, $query));
    $query = "SELECT SUM(visualizacao) AS total FROM Capitulo WHERE fk_Quadrinho_idQua = $idQua";
    $_SESSION['quadrinho']['total'] = mysqli_fetch_assoc(mysqli_query($conexao, $query))['total'] ?? 0;
    $capitulos = "SELECT numCap FROM Capitulo WHERE fk_Quadrinho_idQua = {$idQua} ORDER BY numCap ASC";
    $capitulos = mysqli_query($conexao, $capitulos);
    $_SESSION['capitulos'] = array();
    while($res = mysqli_fetch_assoc($capitulos)['numCap'])
        array_push($_SESSION['capitulos'],$res);

    //Obtém o nome do usuário que criou o quadrinho para seu perfil ser acessível pela página do quadrinho com seu nome
    $publicador = $_SESSION['quadrinho']['fk_Usuario_idUsu'];
    $publicador = "SELECT nome FROM Usuario WHERE idUsu = {$publicador}";
    $publicador = mysqli_query($conexao, $publicador);
    $_SESSION['publicador'] = mysqli_fetch_assoc($publicador)['nome'];

    header('Location: ../pages/manga');
    exit();
?>
