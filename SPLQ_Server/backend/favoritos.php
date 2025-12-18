<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

include 'conexao.php'; // Usa o arquivo que criamos antes

if (!isset($_POST['idUsu'])) {
    echo json_encode(["sucesso" => false, "erro" => "ID do usuário não informado"]);
    exit;
}

$idUsu = (int)$_POST['idUsu'];

try {
    $sql = "SELECT q.idQua, q.nome, q.fonte_capa 
            FROM Favorito f 
            JOIN Quadrinho q ON f.fk_Quadrinho_idQua = q.idQua 
            WHERE f.fk_Usuario_idUsu = :idUsu";
    
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':idUsu', $idUsu);
    $stmt->execute();
    $favoritos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["sucesso" => true, "favoritos" => $favoritos]);

} catch (PDOException $e) {
    echo json_encode(["sucesso" => false, "erro" => $e->getMessage()]);
}
?>