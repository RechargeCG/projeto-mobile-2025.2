<?php
// Desabilita a exibição de erros no output HTTP, evitando quebras de JSON.
error_reporting(E_ALL);
ini_set('display_errors', 0); // CORRIGIDO: Exibição de erros desativada

// Configura o cabeçalho para retorno JSON e permite CORS.
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *'); // CORRIGIDO: Adicionado header CORS
require_once("conexao.php");

// ----------------------------
// 1. Validação do POST
// ----------------------------
if (!isset($_POST['idQua'])) {
    echo json_encode([
        'success' => false,
        'error' => 'idQua não informado'
    ]);
    exit;
}

$idQua = (int) $_POST['idQua']; // cast de segurança

// ----------------------------
// 2. Conexão com o banco
// ----------------------------
$bd = new BD();
$conexao = $bd->criarConexao();

if (!$conexao) {
    echo json_encode([
        'success' => false,
        'error' => 'Erro ao conectar ao banco de dados'
    ]);
    exit;
}

// ----------------------------
// 3. Buscar dados do quadrinho
// ----------------------------
$queryQuadrinho = "SELECT * FROM Quadrinho WHERE idQua = $idQua";
$resQuadrinho = mysqli_query($conexao, $queryQuadrinho);

// Verifica se a query retornou dados antes de tentar usar o resultado.
if (!$resQuadrinho) {
    // Se a query falhar (erro SQL), retorna um JSON de erro.
    echo json_encode([
        'success' => false,
        'error' => 'Erro ao buscar dados do quadrinho no banco de dados.'
    ]);
    exit;
}

$quadrinho = mysqli_fetch_assoc($resQuadrinho);

if (!$quadrinho) {
    echo json_encode([
        'success' => false,
        'error' => 'Quadrinho não encontrado'
    ]);
    exit;
}

// ----------------------------
// 4. Total de visualizações
// ----------------------------
$queryViews = "
    SELECT SUM(visualizacao) AS total 
    FROM Capitulo 
    WHERE fk_Quadrinho_idQua = $idQua
";
$resViews = mysqli_query($conexao, $queryViews);

// CORRIGIDO: Adicionada verificação para evitar Warning se $resViews for false
$views = 0;
if ($resViews) {
    $views = mysqli_fetch_assoc($resViews)['total'] ?? 0;
}

// ----------------------------
// 5. Lista de capítulos
// ----------------------------
$queryCapitulos = "
    SELECT * 
    FROM Capitulo 
    WHERE fk_Quadrinho_idQua = $idQua 
    ORDER BY numCap ASC
";
$resCapitulos = mysqli_query($conexao, $queryCapitulos);

$capitulos = [];

if ($resCapitulos) {
    while ($row = mysqli_fetch_assoc($resCapitulos)) {
        $capitulos[] = [
            'idQua'  => (int) $row['idQua'],
            'numCap' => (int) $row['numCap'],
        ];
    }
}


// ----------------------------
// 6. Nome do publicador
// ----------------------------
$idPublicador = (int) $quadrinho['fk_Usuario_idUsu'];

$queryPublicador = "
    SELECT nome 
    FROM Usuario 
    WHERE idUsu = $idPublicador
";
$resPublicador = mysqli_query($conexao, $queryPublicador);

// CORRIGIDO: Adicionada verificação para evitar Warning se $resPublicador for false
$publicador = null;
if ($resPublicador) {
    $publicador = mysqli_fetch_assoc($resPublicador)['nome'] ?? null;
}

// ----------------------------
// 7. Resposta final
// ----------------------------
echo json_encode([
    'success' => true,
    'quadrinho' => $quadrinho,
    'capitulos' => $capitulos,
    'tags' => $quadrinho['tag'],
    'publicador' => $publicador
], JSON_UNESCAPED_UNICODE);
exit;

?>