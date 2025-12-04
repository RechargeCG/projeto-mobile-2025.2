<?php
    //Cria conexão com o banco de dados
    session_start();
    require_once("conexao.php");
    $conexao = new BD();
    $conexao = $conexao->criarConexao();
    
    //Obtém dados do quadrinho inseridos na página de criação de quadrinho, assim como id do usuário
    $id = $_SESSION['id'];
    $nome = $_POST['nome'];
    $autor = $_POST['autor'];
    $editora = $_POST['editora'];
    $descricao = $_POST['descricao'];
    $tag1 = $_POST['tag1'];
    $tag2 = $_POST['tag2'];
    $tag3 = $_POST['tag3'];
    $tag4 = $_POST['tag4'];

    //Filtra as tags selecionadas
    $tags = array_filter([$_POST['tag1'], $_POST['tag2'], $_POST['tag3'], $_POST['tag4']], function ($tag) {
        return !empty($tag);
    });
    $tags = array_unique($tags);
    $tag = implode(",", $tags);

    //Obtém a imagem de capa do novo quadrinho divida entre seus dados, também explicitando a extensão
    $arquivo = $_FILES['capa'];
    $arquivoNome = $_FILES['capa']['name'];
    $arquivoTmpNome = $_FILES['capa']['tmp_name'];
    $arquivoTamanho = $_FILES['capa']['size'];
    $arquivoErro = $_FILES['capa']['error'];
    $arquivoTipo = $_FILES['capa']['type'];
    $arquivoExt = explode('.', $arquivoNome);
    $arquivoExtReal = strtolower(end($arquivoExt));
    $permitido = array('jpg','jpeg','png','gif');

    //Define e cria o caminho do diretório a para a capa e os capítulos
    $arquivoDestino = "../bd/quadrinhos/[$id]/".$nome;
    $arquivoDestino = str_replace(" ", "_", $arquivoDestino);
    //echo $arquivoDestino."<br>";
    if(!is_dir("../bd/quadrinhos/[$id]"))
        mkdir("../bd/quadrinhos/[$id]",0777);
    if(in_array($arquivoExtReal, $permitido) && !$arquivoErro && mkdir($arquivoDestino,0777)){
        //Adiciona a capa no diretório
        $arquivoDestino.="/capa.$arquivoExtReal";
        //echo $arquivoDestino;
        if (move_uploaded_file($arquivoTmpNome, $arquivoDestino)){
            //Cria o quadrinho no banco de dados, logo direcionando à sua própria página com 
            $arquivoDestino="../".$arquivoDestino;
            mysqli_query($conexao, "INSERT INTO Quadrinho (nome, autor, editora, descricao, fonte_capa, tag, fk_Usuario_idUsu) VALUES ('$nome','$autor','$editora','".mysqli_real_escape_string($conexao, $descricao)."','$arquivoDestino','$tag',$id)");
            $query = "SELECT idQua FROM Quadrinho WHERE nome = '$nome' AND autor = '$autor'";
            $idQua = mysqli_fetch_assoc(mysqli_query($conexao, $query))['idQua'];
            $_SESSION['idQua'] = $idQua;
            
            header('Location: acessa_quadrinho.php');
            exit();
        }
        else{
            $_SESSION['erro'] = "Houve um erro na criação do quadrinho";
            header("Location: ../pages/cadastrarQuadrinho");
            exit();
        }
    }
    else{
        $_SESSION['erro'] = "Você já tem um quadrinho com esse nome, ou seus arquivos estão com algum problema";
        header("Location: ../pages/cadastrarQuadrinho");
        exit();
    }
?>