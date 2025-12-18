<?php
    require('conexao.php');

    $conexao = new BD();
    $conexao = $conexao->criarConexao();

//    $idNovoUsuario = mysqli_query($conexao,"SELECT idUsu FROM Usuario WHERE email = 'Ric@email.com' LIMIT 1");
    $idNovoUsuario = mysqli_fetch_assoc(mysqli_query($conexao,"SELECT idUsu FROM Usuario WHERE email = 'Ric@email.com' "))['idUsu'];

    echo ($idNovoUsuario);

?>
