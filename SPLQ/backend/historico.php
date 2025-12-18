<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

include 'conexao.php';

if (!isset($_POST['idUsu'])) {
    echo json_encode(["sucesso" => false, "erro" => "ID do usuário não informado"]);
    exit;
}

$idUsu = (int)$_POST['idUsu'];

try {
    // Busca o histórico ordenado pela data mais recente
    $sql = "SELECT h.data, c.idCap, c.numCap, q.idQua, q.nome as titulo, q.fonte_capa 
            FROM Historico h
            JOIN Capitulo c ON h.fk_Capitulo_idCap = c.idCap
            JOIN Quadrinho q ON c.fk_Quadrinho_idQua = q.idQua
            WHERE h.fk_Usuario_idUsu = :idUsu
            ORDER BY h.data DESC LIMIT 20";
    
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':idUsu', $idUsu);
    $stmt->execute();
    $historico = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["sucesso" => true, "historico" => $historico]);

} catch (PDOException $e) {
    echo json_encode(["sucesso" => false, "erro" => $e->getMessage()]);
}
?>