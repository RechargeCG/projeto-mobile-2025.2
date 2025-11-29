<!-- Página descartada -->

<?php
  session_start();
  require_once("conexao.php");
	$conexao = new BD();
	$conexao = $conexao->criarConexao();

  if(isset($_POST['idQua'])){
    $_SESSION['idQua'] = $idQua;
    header('Location: acessa_quadrinho.php');
    exit();
    $idQua = $_POST['idQua'];
    $query = "SELECT * FROM Quadrinho WHERE idQua = {$idQua}";
    $_SESSION['quadrinho'] = mysqli_fetch_assoc(mysqli_query($conexao, $query));
    $query = "SELECT SUM(visualizacao) AS total FROM Capitulo WHERE fk_Quadrinho_idQua = $idQua";
    $_SESSION['quadrinho']['total'] = mysqli_fetch_assoc(mysqli_query($conexao, $query))['total'];
    $capitulos = "SELECT COUNT(*) AS total FROM Capitulo WHERE fk_Quadrinho_idQua = {$idQua}";
    $_SESSION['capitulos'] = mysqli_fetch_assoc(mysqli_query($conexao, $capitulos))['total'];
    header('Location: ../pages/manga');
    exit();
  }
?>

<html>
    <form method="POST" action="acessa_quadrinho.php">
        <input name="idQua" type="text">
        <input type="submit" value="Ler">
    </form>
</html>
