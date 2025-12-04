<?php
    session_start();
    require_once("conexao.php");
	$conexao = new BD();
	$conexao = $conexao->criarConexao();
    
    //Cria a query para a tela de pesquisa
    $query = "SELECT q.*, COALESCE(SUM(c.visualizacao), 0) AS total FROM Quadrinho q LEFT JOIN Capitulo c ON q.idQua = c.fk_Quadrinho_idQua";
    $condicoes = [];
    if (isset($_POST['search'])) {
        $busca = mysqli_real_escape_string($conexao, $_POST['search']);
        $_SESSION['search'] = $_POST['search'];
        $condicoes[] = "(q.nome LIKE \"%$busca%\" OR q.autor LIKE \"%$busca%\" OR q.editora LIKE \"%$busca%\")";
    }
    if (isset($_POST['tag'])) {
        $busca = mysqli_real_escape_string($conexao, $_POST['tag']);
        $condicoes[] = "q.tag LIKE \"%$busca%\"";
    }
    if (!empty($condicoes)) {
        $query .= " WHERE " . implode(" AND ", $condicoes) . " ";
    }
    $query .= "GROUP BY q.idQua ";
    if (isset($_POST['ordem'])) {
        if ($_POST['ordem'] == "A-Z") {
            $query .= "ORDER BY q.nome ASC ";
        } else if ($_POST['ordem'] == "Z-A") {
            $query .= "ORDER BY q.nome DESC ";
        } else if ($_POST['ordem'] == "+Novos->+Velhos") {
            $query .= "ORDER BY q.idQua DESC ";
        } else if ($_POST['ordem'] == "Popular") {
            $query .= "ORDER BY total DESC ";
        }
    }
    $_SESSION['resultado'] = $query;

    //echo $query;
    
    header("Location: ../pages/pesquisa");
    exit();
?>