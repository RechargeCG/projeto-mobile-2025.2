<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

include 'conexao.php';

// Recebe os dados via POST (pode ser JSON ou FormData)
$busca = $_POST['busca'] ?? '';
$tagsRaw = $_POST['tags'] ?? ''; // Espera uma string separada por vírgulas ou array

try {
    // Base da query
    $sql = "SELECT idQua, nome, fonte_capa FROM Quadrinho WHERE 1=1";
    $params = [];

    // Filtro por nome
    if (!empty($busca)) {
        $sql .= " AND nome LIKE :busca";
        $params[':busca'] = "%$busca%";
    }

    // Filtro por tags (Lógica simples: verifica se a tag está na coluna 'tag' do banco)
    if (!empty($tagsRaw)) {
        $tagsArray = is_array($tagsRaw) ? $tagsRaw : explode(',', $tagsRaw);
        foreach ($tagsArray as $index => $tag) {
            $key = ":tag" . $index;
            $sql .= " AND tag LIKE $key";
            $params[$key] = "%$tag%";
        }
    }

    $stmt = $conn->prepare($sql);
    $stmt->execute($params);
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "sucesso" => true, 
        "resultados" => $resultados
    ]);

} catch (PDOException $e) {
    echo json_encode(["sucesso" => false, "erro" => $e->getMessage()]);
}
?>