<!-- Página descartada -->

<?php
  session_start();
  require_once("conexao.php");
	$conexao = new BD();
	$conexao = $conexao->criarConexao();
  
  if(isset($_POST['nome'])){
    $_SESSION['cbz'] = $_POST['nome'];
    $_SESSION['quadrinho'] = 1;
    $_SESSION['capitulo'] = 1;
    echo $_SESSION['cbz'].'<br>';
    echo $_SESSION['quadrinho'].'<br>';
    echo $_SESSION['capitulo'].'<br>';
    header('Location: capitulo.php');
    exit();
  }

?>

<html>
    <form method="POST" action="escolher_capitulo.php">
        <input name="nome" type="text">
        <input type="submit" value="Ler">
    </form>
</html>
