<?php
error_reporting(0);
ini_set('display_errors', 0);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once 'conexao.php';

/* ==================================================
 * 1. Validação dos dados
 * ================================================== */
if (
    !isset($_POST['idUsu']) ||
    !isset($_POST['idCap']) ||
    !isset($_POST['comentario'])
) {
    echo json_encode([
        'success' => false,
        'error' => 'Parâmetros obrigatórios ausentes'
    ]);
    exit;
}

$idUsu      = (int) $_POST['idUsu'];
$idCap      = (int) $_POST['idCap'];
$comentario = trim($_POST['comentario']);

if ($comentario === '') {
    echo json_encode([
        'success' => false,
        'error' => 'Comentário vazio'
    ]);
    exit;
}

/* ==================================================
 * 2. Conexão com o banco
 * ================================================== */
$bd  = new BD();
$con = $bd->criarConexao();

if (!$con) {
    echo json_encode([
        'success' => false,
        'error' => 'Falha na conexão com o banco'
    ]);
    exit;
}

/* ==================================================
 * 3. Inserir comentário
 * ================================================== */
$comentarioEscapado = mysqli_real_escape_string($con, $comentario);

$sqlInsert = "
    INSERT INTO Comentario (
        texto,
        fk_Capitulo_idCap,
        fk_Usuario_idUsu,
        status,
        data
    ) VALUES (
        '$comentarioEscapado',
        $idCap,
        $idUsu,
        1,
        NOW()
    )
";

if (!mysqli_query($con, $sqlInsert)) {
    echo json_encode([
        'success' => false,
        'error' => 'Erro ao inserir comentário'
    ]);
    exit;
}

/* ==================================================
 * 4. Buscar comentários atualizados do capítulo
 * ================================================== */
$sqlComentarios = "
    SELECT
        Usuario.idUsu,
        Usuario.nome,
        Usuario.fonte_foto,
        Comentario.idCom,
        Comentario.texto,
        Comentario.data
    FROM Comentario
    JOIN Usuario ON Usuario.idUsu = Comentario.fk_Usuario_idUsu
    WHERE Comentario.fk_Capitulo_idCap = $idCap
      AND Comentario.status = 1
    ORDER BY Comentario.idCom ASC
";

$res = mysqli_query($con, $sqlComentarios);

$comentarios = [];
while ($row = mysqli_fetch_assoc($res)) {
    $comentarios[] = $row;
}

/* ==================================================
 * 5. Retorno JSON
 * ================================================== */
echo json_encode([
    'success' => true,
    'message' => 'Comentário adicionado com sucesso',
    'comentarios' => $comentarios
], JSON_UNESCAPED_UNICODE);

exit;

