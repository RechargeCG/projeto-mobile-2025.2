<?php
	//Cria conexão com o banco de dados
    session_start();
	require_once("conexao.php");
	$conexao = new BD();
	$conexao = $conexao->criarConexao();

	//Retorna à página de login caso algum dado de login não tenha sido preenchido
	if(empty($_POST['email']) || empty($_POST['senha']))
	{
		header('Location: ../pages/login/');
		exit();
	}

	//Recebe os dados para login
	$email = mysqli_real_escape_string($conexao, $_POST['email']);
	$senha = mysqli_real_escape_string($conexao, $_POST['senha']);

	//Verifica se os dados informados existem no banco e realiza o login caso estejam corretos, adicionando o id do usuário à sessão
	$query = "SELECT * FROM usuario WHERE email = '{$email}'";
	$resultado = mysqli_query($conexao, $query);
	if(isset($resultado) && mysqli_num_rows($resultado) == 1){
		$resultado = mysqli_fetch_assoc($resultado);
		if(password_verify($senha,$resultado['senha'])){
			$id = mysqli_query($conexao, "SELECT idUsu FROM usuario WHERE email = '{$email}'");
			$id = mysqli_fetch_assoc($id);
			$_SESSION['id'] = $id['idUsu'];
			require_once("tags.php");
			header('Location: ../pages/home/');
			exit();
		}
	}

	$_SESSION['erro'] = "E-mail ou senha incorreta.";
	header('Location: ../pages/login/');
	exit();
?>
