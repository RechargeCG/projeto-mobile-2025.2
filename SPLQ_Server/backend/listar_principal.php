<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

include 'conexao.php';

try {
    // 1. Destaques (Os 5 mais visualizados ou recentes)
    $queryDestaques = "SELECT idQua, nome, fonte_capa FROM Quadrinho LIMIT 5";
    $stmtDestaques = $conn->query($queryDestaques);
    $destaques = $stmtDestaques->fetchAll(PDO::FETCH_ASSOC);

    // 2. Recentes (Ordenado pela data do último capítulo inserido)
    $queryRecentes = "SELECT q.idQua, q.nome, q.fonte_capa, MAX(c.data) as ultima_att 
                      FROM Quadrinho q 
                      LEFT JOIN Capitulo c ON q.idQua = c.fk_Quadrinho_idQua 
                      GROUP BY q.idQua 
                      ORDER BY ultima_att DESC LIMIT 10";
    $stmtRecentes = $conn->query($queryRecentes);
    $recentes = $stmtRecentes->fetchAll(PDO::FETCH_ASSOC);

    // 3. Populares (Pode ser por número de favoritos ou visualizações totais)
    $queryPopulares = "SELECT q.idQua, q.nome, q.fonte_capa 
                       FROM Quadrinho q 
                       ORDER BY q.idQua ASC LIMIT 10"; // Ajuste conforme sua lógica de popularidade
    $stmtPopulares = $conn->query($queryPopulares);
    $populares = $stmtPopulares->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "sucesso" => true,
        "destaques" => $destaques,
        "recentes" => $recentes,
        "populares" => $populares
    ]);

} catch (PDOException $e) {
    echo json_encode(["erro" => $e->getMessage()]);
}
?>