<?php
    //Apenas destrói a sessão PHP, efetivamente deslogando o usuário
    session_start();
    session_destroy();
    header('Location: ../');
    exit();
?>
