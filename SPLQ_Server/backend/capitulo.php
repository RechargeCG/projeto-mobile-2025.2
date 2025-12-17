<?php
error_reporting(0);
ini_set('display_errors', 0);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once 'conexao.php';

/* ==================================================
 * 1. Validação do POST
 * ================================================== */
if (!isset($_POST['idCap'])) {
    echo json_encode([
        'success' => false,
        'error' => 'idCap não informado'
    ]);
    exit;
}

$idCap = (int) $_POST['idCap'];

/* ==================================================
 * 2. Conexão com banco
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
 * 3. Buscar dados do capítulo
 * ================================================== */
$sqlCap = "
    SELECT *
    FROM Capitulo
    WHERE idCap = $idCap
      AND status = 1
    LIMIT 1
";

$resCap   = mysqli_query($con, $sqlCap);
$capitulo = mysqli_fetch_assoc($resCap);

if (!$capitulo) {
    echo json_encode([
        'success' => false,
        'error' => 'Capítulo não encontrado'
    ]);
    exit;
}

/* ==================================================
 * 4. Buscar dados do quadrinho
 * ================================================== */
$idQua = (int) $capitulo['fk_Quadrinho_idQua'];

$sqlQua = "
    SELECT *
    FROM Quadrinho
    WHERE idQua = $idQua
    LIMIT 1
";

$resQua   = mysqli_query($con, $sqlQua);
$quadrinho = mysqli_fetch_assoc($resQua);

/* ==================================================
 * 5. Buscar comentários
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

$resComentarios = mysqli_query($con, $sqlComentarios);

$comentarios = [];
while ($row = mysqli_fetch_assoc($resComentarios)) {
    $comentarios[] = $row;
}

/* ==================================================
 * 6. Caminhos e validação do CBZ
 * ================================================== */

// Pasta raiz do projeto (SPLQ_Server)
$baseDir = realpath(__DIR__ . '/../');

// Caminho salvo no banco (ex: uploads/cbz/arquivo.cbz)
$cbzRelativePath = $capitulo['fonte'];

// Caminho absoluto real do CBZ
$cbzPath = $baseDir . '/' . $cbzRelativePath;

// if($capitulo['fonte'])
//     $cbzPath = $capitulo['fonte'];

// Verificação REAL do arquivo
if (!file_exists($cbzPath)) {
    echo json_encode([
        'success' => false,
        'error' => 'Arquivo CBZ não encontrado'
    ]);
    exit;
}

/* ==================================================
 * 7. Diretórios temporários
 * ================================================== */

$tempRoot   = $baseDir . '/temp';
$tempCapDir = $tempRoot . '/' . $idCap;

$baseUrl = 'http://192.168.1.7/SPLQ_Server/temp/' . $idCap . '/';

if (!is_dir($tempRoot)) {
    mkdir($tempRoot, 0755, true);
}

if (!is_dir($tempCapDir)) {
    mkdir($tempCapDir, 0755, true);
}

/* ==================================================
 * 8. Descompactar CBZ
 * ================================================== */

$zip   = new ZipArchive();
$pages = [];

if ($zip->open($cbzPath) === TRUE) {

    $imageIndex = 1;

    for ($i = 0; $i < $zip->numFiles; $i++) {

        $entry = $zip->getNameIndex($i);

        // Ignora diretórios e lixo do macOS
        if (substr($entry, -1) === '/' || strpos($entry, '__MACOSX') !== false) {
            continue;
        }

        $ext = strtolower(pathinfo($entry, PATHINFO_EXTENSION));

        if (!in_array($ext, ['jpg', 'jpeg', 'png', 'webp'])) {
            continue;
        }

        $fileName = str_pad($imageIndex, 3, '0', STR_PAD_LEFT) . '.' . $ext;
        $destPath = $tempCapDir . '/' . $fileName;

        // Evita reescrever se já existir
        if (!file_exists($destPath)) {

            $stream = $zip->getStream($entry);
            if ($stream) {

                $out = fopen($destPath, 'w');

                while (!feof($stream)) {
                    fwrite($out, fread($stream, 1024));
                }

                fclose($out);
                fclose($stream);
            }
        }

        $pages[] = $baseUrl . $fileName;
        $imageIndex++;
    }

    $zip->close();

} else {
    echo json_encode([
        'success' => false,
        'error' => 'Falha ao abrir arquivo CBZ'
    ]);
    exit;
}

/* ==================================================
 * 9. Incrementar visualizações
 * ================================================== */
mysqli_query($con, "
    UPDATE Capitulo
    SET visualizacao = visualizacao + 1
    WHERE idCap = $idCap
");

/* ==================================================
 * 10. Resposta JSON FINAL
 * ================================================== */
echo json_encode([
    'success'     => true,
    'capitulo'    => $capitulo,
    'quadrinho'   => $quadrinho,
    'paginas'     => $pages,
    'comentarios' => $comentarios
], JSON_UNESCAPED_UNICODE);

exit;
