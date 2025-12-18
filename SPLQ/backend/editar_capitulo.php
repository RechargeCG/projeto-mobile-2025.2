<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
require_once("conexao.php");

$bd = new BD();
$conexao = $bd->criarConexao();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $idCap = $_POST['idCap'] ?? null;
    $numCapNovo = $_POST['numCap'] ?? null;
    
    if (!$idCap || !$numCapNovo) {
        echo json_encode(['success' => false, 'error' => 'Dados incompletos']);
        exit;
    }

    // 1. Buscar dados atuais do capítulo e ID do usuário para localizar a pasta
    $sqlBusca = "SELECT c.numCap, c.fonte, c.fk_Quadrinho_idQua, q.fk_Usuario_idUsu 
                 FROM Capitulo c 
                 JOIN Quadrinho q ON c.fk_Quadrinho_idQua = q.idQua 
                 WHERE c.idCap = $idCap";
    
    $resBusca = mysqli_query($conexao, $sqlBusca);
    $dadosAtuais = mysqli_fetch_assoc($resBusca);

    if (!$dadosAtuais) {
        echo json_encode(['success' => false, 'error' => 'Capítulo não encontrado']);
        exit;
    }

    $idUsu = $dadosAtuais['fk_Usuario_idUsu'];
    $idQua = $dadosAtuais['fk_Quadrinho_idQua'];
    $numCapAntigo = $dadosAtuais['numCap'];
    $fonteAntiga = $dadosAtuais['fonte'];
    
    $diretorioObra = "../Usuarios/$idUsu/quadrinhos/$idQua";
    $nomeNovoArquivo = "capitulo_" . $numCapNovo . ".cbz";
    $caminhoFinal = $diretorioObra . "/" . $nomeNovoArquivo;

    // 2. Se um NOVO arquivo foi enviado, substituímos o antigo
    if (isset($_FILES['arquivo']) && $_FILES['arquivo']['error'] === UPLOAD_ERR_OK) {
        // Remove arquivo antigo se existir e for diferente do novo
        if (file_exists($diretorioObra . "/" . $fonteAntiga)) {
            unlink($diretorioObra . "/" . $fonteAntiga);
        }
        move_uploaded_file($_FILES['arquivo']['tmp_name'], $caminhoFinal);
    } 
    // 3. Se não enviou arquivo novo, mas mudou o número, renomeamos o arquivo atual
    else if ($numCapNovo != $numCapAntigo) {
        if (file_exists($diretorioObra . "/" . $fonteAntiga)) {
            rename($diretorioObra . "/" . $fonteAntiga, $caminhoFinal);
        }
    }

    // 4. Atualizar Banco de Dados
    $sqlUpdate = "UPDATE Capitulo SET numCap = $numCapNovo, fonte = '$nomeNovoArquivo' WHERE idCap = $idCap";
    
    if (mysqli_query($conexao, $sqlUpdate)) {
        echo json_encode(['success' => true, 'message' => 'Capítulo atualizado com sucesso!']);
    } else {
        echo json_encode(['success' => false, 'error' => 'Erro ao atualizar banco: ' . mysqli_error($conexao)]);
    }
}
?>