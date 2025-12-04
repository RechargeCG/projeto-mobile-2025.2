<?php
    //Cria conexão com o banco de dados
    session_start();
    require_once("conexao.php");
    $conexao = new BD();
    $conexao = $conexao->criarConexao();

    $id = $_SESSION['id'];

    if(isset($_POST['nome'])){
        $nome = $_POST['nome'];
        mysqli_query($conexao, "UPDATE Usuario SET nome = \"$nome\"  WHERE idUsu = $id");
    }
    
    if(isset($_POST['descricao'])){
        $descricao = $_POST['descricao'];
        mysqli_query($conexao, "UPDATE Usuario SET descricao = \"$descricao\"  WHERE idUsu = $id");
    }

    //Obtém a imagem de perfil do usuário divida entre seus dados, também explicitando a extensão
    if(isset($_FILES['imagem'])){
        $arquivo = $_FILES['imagem'];
        $arquivoNome = $_FILES['imagem']['name'];
        $arquivoTmpNome = $_FILES['imagem']['tmp_name'];
        $arquivoTamanho = $_FILES['imagem']['size'];
        $arquivoErro = $_FILES['imagem']['error'];
        $arquivoTipo = $_FILES['imagem']['type'];
        $arquivoExt = explode('.', $arquivoNome);
        $arquivoExtReal = strtolower(end($arquivoExt));
        $permitido = array('jpg','jpeg','png','gif');

        //Define e cria o caminho do diretório a para a imagem de perfil
        $arquivoDestino = "../bd/usuarios/$id";
        try {
            mkdir($arquivoDestino,0777);
        }
        catch(e){
            echo "Diretório já existe<br>";
        }
        //echo $arquivoDestino."<br>";

        // echo $arquivoNome."0<br>";
        // echo in_array($arquivoExtReal, $permitido)."a<br>";
        // echo (!$arquivoErro)."b<br>";
        if(in_array($arquivoExtReal, $permitido) && !$arquivoErro){
            //Adiciona a capa no diretório
            $arquivoDestino.="/perfil.$arquivoExtReal";
            //echo $arquivoDestino;
            if (move_uploaded_file($arquivoTmpNome, $arquivoDestino)){
                //Cria o quadrinho no banco de dados, logo direcionando à sua própria página com 
                $arquivoDestino="../".$arquivoDestino;
                mysqli_query($conexao, "UPDATE Usuario SET fonte_foto = \"$arquivoDestino\"  WHERE idUsu = $id");
            }
            else
                echo "Algo deu errado1";
        }
        else
            echo "Algo deu errado2";
    }

    header('Location: acessa_perfil.php');
    exit();
?>