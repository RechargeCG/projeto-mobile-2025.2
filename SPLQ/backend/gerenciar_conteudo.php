<?php
header('Content-Type: application/json');
require_once("conexao.php");
$bd = new BD();
$con = $bd->criarConexao();

$acao = $_POST['acao'] ?? '';

// --- AUXILIAR: Criar pastas recursivas ---
function criarPasta($caminho) {
    if (!file_exists($caminho)) {
        mkdir($caminho, 0777, true);
    }
}

switch ($acao) {
    case 'cadastrar_obra':
        $idUsu = (int)$_POST['idUsu'];
        $nome = $_POST['nome'];
        $autor = $_POST['autor'];
        $tags = $_POST['tags'];
        $desc = $_POST['descricao'];

        $sql = "INSERT INTO Quadrinho (nome, autor, tag, descricao, fk_Usuario_idUsu, status) 
                VALUES ('$nome', '$autor', '$tags', '$desc', $idUsu, 1)";
        
        if (mysqli_query($con, $sql)) {
            $idQua = mysqli_insert_id($con);
            $caminhoBase = "../Usuarios/$idUsu/quadrinhos/$idQua/";
            criarPasta($caminhoBase);

            // Upload da Capa
            if (isset($_FILES['capa'])) {
                $ext = pathinfo($_FILES['capa']['name'], PATHINFO_EXTENSION);
                $nomeCapa = "capa." . $ext;
                move_uploaded_file($_FILES['capa']['tmp_name'], $caminhoBase . $nomeCapa);
                $urlCapa = "http://".$_SERVER['HTTP_HOST']."/SPLQ_Server/Usuarios/$idUsu/quadrinhos/$idQua/".$nomeCapa;
                mysqli_query($con, "UPDATE Quadrinho SET fonte_capa = '$urlCapa' WHERE idQua = $idQua");
            }
            echo json_encode(["sucesso" => true, "idQua" => $idQua]);
        }
        break;

    case 'cadastrar_capitulo':
        $idQua = (int)$_POST['idQua'];
        $idUsu = (int)$_POST['idUsu']; // Precisamos para a pasta
        $numCap = (int)$_POST['numCap'];

        $sql = "INSERT INTO Capitulo (numCap, fk_Quadrinho_idQua, status, visualizacao) 
                VALUES ($numCap, $idQua, 1, 0)";
        
        if (mysqli_query($con, $sql)) {
            $idCap = mysqli_insert_id($con);
            $caminhoCap = "../Usuarios/$idUsu/quadrinhos/$idQua/capitulos/$idCap/";
            criarPasta($caminhoCap);

            if (isset($_FILES['arquivo_cbz'])) {
                $nomeArq = "arquivo.cbz";
                move_uploaded_file($_FILES['arquivo_cbz']['tmp_name'], $caminhoCap . $nomeArq);
                $urlFinal = "Usuarios/$idUsu/quadrinhos/$idQua/capitulos/$idCap/".$nomeArq;
                mysqli_query($con, "UPDATE Capitulo SET fonte = '$urlFinal' WHERE idCap = $idCap");
            }
            echo json_encode(["sucesso" => true]);
        }
        break;
}
?>