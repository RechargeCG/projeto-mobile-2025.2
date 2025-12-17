<?php
    session_start();
    require_once("conexao.php");

    if (!isset($_SESSION['id']) || !isset($_SESSION['idQua'])) {
        echo "Sessão inválida.";
        header("Location: ../pages/login");
        exit();
    }

    $idUsu = $_SESSION['id'];
    $idQua = $_SESSION['idQua'];

    $bd = new BD();
    $conexao = $bd->criarConexao();

    // Verifica se já existe favorito
    $stmt = $conexao->prepare("SELECT 1 FROM favorito WHERE fk_Usuario_idUsu = ? AND fk_Quadrinho_idQua = ?");
    $stmt->bind_param("ii", $idUsu, $idQua);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Já existe: remover
        $delete = $conexao->prepare("DELETE FROM favorito WHERE fk_Usuario_idUsu = ? AND fk_Quadrinho_idQua = ?");
        $delete->bind_param("ii", $idUsu, $idQua);
        if ($delete->execute()) {
            echo "Removido dos favoritos.";
        } else {
            echo "Erro ao remover.";
        }
    } else {
        // Não existe: inserir
        $insert = $conexao->prepare("INSERT INTO favorito (fk_Usuario_idUsu, fk_Quadrinho_idQua) VALUES (?, ?)");
        $insert->bind_param("ii", $idUsu, $idQua);
        if ($insert->execute()) {
            echo "Adicionado aos favoritos.";
        } else {
            echo "Erro ao adicionar.";
        }
    }
    header('Location:../pages/favoritos');
    exit();
?>