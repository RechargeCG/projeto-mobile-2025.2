<?php
    //Cria conexão com o banco de dados
    session_start();
    require_once("conexao.php");
    $conexao = new BD();
    $conexao = $conexao->criarConexao();

    $id = $_SESSION['id'];

    //Altera a senha efetivamente removendo acesso da conta ao usuário, setando o nome como usuário deletado, email como removido e apagando seus dados
    mysqli_query($conexao, "UPDATE Usuario SET senha = '', nome = 'Usuário Deletado', email = 'Removido' WHERE idUsu = $id");
    mysqli_query($conexao, "DELETE FROM Quadrinho WHERE fk_Usuario_idUsu = {$id}");
    $src = "../bd/usuarios/$id";
    if(is_dir($src)){
        $dir = opendir($src);
        while(false !== ( $file = readdir($dir)) ) {
            if (( $file != '.' ) && ( $file != '..' )) {
                $full = $src . '/' . $file;
                if ( is_dir($full) ) {
                    rmdir($full);
                }
                else {
                    unlink($full);
                }
            }
        }
        closedir($dir);
        rmdir($src);
    }
    $src = "../bd/quadrinhos/[$id]/";
    if(is_dir($src)){
        $dir = opendir($src);
        while(false !== ( $file = readdir($dir)) ) {
            if (( $file != '.' ) && ( $file != '..' )) {
                $full = $src . '/' . $file;
                if ( is_dir($full) ) {
                    rmdir($full);
                }
                else {
                    unlink($full);
                }
            }
        }
        closedir($dir);
        rmdir($src);
    }

    header("Location: logout.php");
    exit();
?>