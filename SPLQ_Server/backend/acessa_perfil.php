<?php
    //Cria conexão com o banco de dados
    session_start();
    require_once("conexao.php");
	$conexao = new BD();
	$conexao = $conexao->criarConexao();

    //Define o perfil a ser exibido pelo id, e se não estiver logado retorna à página de login
    if(isset($_POST['idPerfil']) && $_POST['idPerfil'] != NULL)
        $id = $_POST['idPerfil'];
    else if(isset($_SESSION['id']))
        $id = $_SESSION['id'];
    else {
        header("Location: ../pages/login");
        exit();
    }

    $_POST['idPerfil'] = NULL; //Só por garantia

    //Obtém os dados de perfil do usuário, assim como de suas obras publicadas
    $query = "SELECT * FROM Usuario WHERE idUsu = $id";
    $_SESSION['perfil'] = mysqli_fetch_assoc(mysqli_query($conexao, $query));
    $query = "SELECT q.*, COALESCE(SUM(c.visualizacao), 0) AS total FROM Quadrinho q LEFT JOIN Capitulo c ON q.idQua = c.fk_Quadrinho_idQua WHERE q.fk_Usuario_idUsu = $id GROUP BY q.idQua";
    $_SESSION['obras'] = $query;

    header("Location: ../pages/perfil");
    exit();
?>