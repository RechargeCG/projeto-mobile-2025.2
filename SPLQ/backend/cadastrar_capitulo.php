<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
require_once("conexao.php");

$bd = new BD();
$conexao = $bd->criarConexao();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $idQua = $_POST['idQua'] ?? null;
    $numCap = $_POST['numCap'] ?? null;
    
    if (!$idQua || !$numCap || !isset($_FILES['arquivo'])) {
        echo json_encode(['success' => false, 'error' => 'Dados incompletos']);
        exit;
    }

    // 1. Definir caminhos de pasta
    // Estrutura: ../Usuarios/{idUsu}/quadrinhos/{idQua}/capitulos/{numCap}.cbz
    $queryUser = mysqli_query($conexao, "SELECT fk_Usuario_idUsu FROM Quadrinho WHERE idQua = $idQua");
    $user = mysqli_fetch_assoc($queryUser);
    $idUsu = $user['fk_Usuario_idUsu'];

    $diretorioObra = "../Usuarios/$idUsu/quadrinhos/$idQua";
    if (!file_exists($diretorioObra)) {
        mkdir($diretorioObra, 0777, true);
    }

    $nomeArquivo = "capitulo_" . $numCap . ".cbz";
    $caminhoFinal = $diretorioObra . "/" . $nomeArquivo;

    // 2. Mover arquivo enviado
    if (move_uploaded_file($_FILES['arquivo']['tmp_name'], $caminhoFinal)) {
        
        // 3. Inserir no Banco de Dados
        $sql = "INSERT INTO Capitulo (numCap, fonte, visualizacao, fk_Quadrinho_idQua, status) 
                VALUES ($numCap, '$nomeArquivo', 0, $idQua, 1)";
        
        if (mysqli_query($conexao, $sql)) {
            echo json_encode(['success' => true, 'message' => 'Capítulo cadastrado com sucesso!']);
        } else {
            echo json_encode(['success' => false, 'error' => 'Erro ao salvar no banco: ' . mysqli_error($conexao)]);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Erro ao mover arquivo para o servidor']);
    }
}
?>