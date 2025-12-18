<?php
// Define o cabeçalho para resposta JSON
header('Content-Type: application/json');

// Cria conexão com o banco de dados
require_once("conexao.php");
$conexao = new BD();
$conexao = $conexao->criarConexao();

// Verifica se o ID foi enviado via POST (FormData)
if (!isset($_POST['id'])) {
    echo json_encode([
        "success" => false,
        "message" => "ID do usuário não fornecido."
    ]);
    exit();
}

// Sanitiza o ID recebido
$id = intval($_POST['id']);

// 1. Atualiza o usuário (Soft Delete)
// Remove a senha, altera nome e e-mail
$queryUpdate = "UPDATE Usuario SET senha = '', nome = 'Usuário Deletado', email = 'Removido' WHERE idUsu = $id";
$resUpdate = mysqli_query($conexao, $queryUpdate);

// 2. Remove os quadrinhos do banco de dados
$queryDeleteComics = "DELETE FROM Quadrinho WHERE fk_Usuario_idUsu = $id";
$resDelete = mysqli_query($conexao, $queryDeleteComics);

// 3. Função auxiliar para deletar pastas recursivamente
function deletarPasta($dir) {
    if (!is_dir($dir)) return;
    
    $files = array_diff(scandir($dir), array('.', '..'));
    foreach ($files as $file) {
        (is_dir("$dir/$file")) ? deletarPasta("$dir/$file") : unlink("$dir/$file");
    }
    return rmdir($dir);
}

// 4. Limpeza de arquivos e pastas
// Pasta de perfil do usuário
$caminhoUsuario = "../bd/usuarios/$id";
deletarPasta($caminhoUsuario);

// Pasta de quadrinhos do usuário
// Nota: Verifique se o nome da pasta é realmente "[$id]" com colchetes ou apenas "$id"
$caminhoQuadrinhos = "../bd/quadrinhos/[$id]/"; 
deletarPasta($caminhoQuadrinhos);

// 5. Retorna o sucesso para o React Native
if ($resUpdate) {
    echo json_encode([
        "success" => true,
        "message" => "Conta e arquivos excluídos com sucesso."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Erro ao processar exclusão no banco de dados."
    ]);
}

exit();
?>