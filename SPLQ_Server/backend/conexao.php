<?php
	//Arquivo geral de conexão com o banco de dados, com host alternativos para diferentes padrões do XAMPP

	mysqli_report(MYSQLI_REPORT_OFF);
	class BD
	{
		private $host = "localhost:3306";
		private $hostalternativo = "localhost:3307";
		private $usuario = "root";
		private $senha = "";
		private $banco = "dwebii";
		private $conexao;

		//Função para retornar a conexão com o banco
		function criarConexao(){
			$conexao = @mysqli_connect($this->host,$this->usuario,$this->senha,$this->banco);
			if(!$conexao) $conexao = mysqli_connect($this->hostalternativo,$this->usuario,$this->senha,$this->banco);
			return $conexao;
		}
	}
?>
