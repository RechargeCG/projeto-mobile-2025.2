<?php
// Arquivo de conexão com o banco de dados (BD)

// Configurações de Conexão (ADAPTE CONFORME SEU AMBIENTE)
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'splq'); // Nome do seu banco de dados (encontrado no seu snippet)

// Tenta estabelecer a conexão usando a classe mysqli
$conexao = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Verifica a conexão
if ($conexao->connect_error) {
    // Em caso de erro, retorna uma resposta de erro JSON
    http_response_code(500);
    echo json_encode(array("message" => "Erro fatal na conexão com o banco de dados: " . $conexao->connect_error));
    die();
}

// Define o charset
$conexao->set_charset("utf8");

// Agora as outras APIs podem usar a variável $conexao.
?>
