<?php
    //Define as tags padrões dos quadrinhos no sistema
    session_start();
    $_SESSION['tags'] = array(
        "Terror",
        "Suspense",
        "Drama",
        "Ação",
        "Comédia"
    );
    sort($_SESSION['tags']);
?>