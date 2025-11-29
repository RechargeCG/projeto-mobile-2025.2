<?php
    //Cria conexão com o banco de dados
    session_start();
    require_once("conexao.php");
    $conexao = new BD();
    $conexao = $conexao->criarConexao();

    //Obtém dados básicos de id do usuário e do quadrinho, assim como o número do novo capítulo
    $id = $_SESSION['id'];
    $idQua = $_SESSION['idQua'];
    $capitulo = $_POST['numero'];

    echo $capitulo."<br>".$idQua;

    //Verifica se um capítulo com o número informado já existe
    $capitulos = "SELECT numCap FROM Capitulo WHERE fk_Quadrinho_idQua = {$idQua} AND numCap = {$capitulo}";
    $capitulos = mysqli_query($conexao, $capitulos);
    if($capitulo == mysqli_fetch_assoc($capitulos)['numCap']){
        $_SESSION['erro'] = "Capítulo já existente";
        header("Location: ../pages/cadastrarCapitulo");
        exit();
    }
    
    //Obtém o arquivo do novo capítulo divido entre seus dados, também explicitando a extensão
    $arquivo = $_FILES['arquivo'];
    $arquivoNome = $_FILES['arquivo']['name'];
    $arquivoTmpNome = $_FILES['arquivo']['tmp_name'];
    $arquivoTamanho = $_FILES['arquivo']['size'];
    $arquivoErro = $_FILES['arquivo']['error'];
    $arquivoTipo = $_FILES['arquivo']['type'];
    $arquivoExt = explode('.', $arquivoNome);
    $arquivoExtReal = strtolower(end($arquivoExt));
    $permitido = array('cbz'/*,'cbr','cb7'*/);
    
    //Cria o novo capítulo no diretório e, se bem sucedido, no banco de dados
    $dir = mysqli_fetch_assoc(mysqli_query($conexao,"SELECT * FROM Quadrinho WHERE idQua = '$idQua'"));
    if(in_array($arquivoExtReal, $permitido) && !$arquivoErro){
        $arquivoDestino = "../bd/quadrinhos/[".$dir['fk_Usuario_idUsu']."]/".$dir['nome']."/".$capitulo.".$arquivoExtReal";
        $arquivoDestino = str_replace(" ", "_", $arquivoDestino);
        if (move_uploaded_file($arquivoTmpNome, $arquivoDestino)){
            $arquivoDestino="../".$arquivoDestino;
            mysqli_query($conexao, "INSERT INTO Capitulo (numCap, fonte, visualizacao, fk_Quadrinho_idQua) VALUES (" .$capitulo. ", '" . mysqli_real_escape_string($conexao, $arquivoDestino) . "', 0, $idQua)");
        }
        else{
            $_SESSION['erro'] = "Houve um erro na criação do capítulo";
            header("Location: ../pages/cadastrarCapitulo");
            exit();
        }
    }
    else{
        $_SESSION['erro'] = "Arquivo danificado ou com extensão incorreta";
        header("Location: ../pages/cadastrarCapitulo");
        exit();
    }
    
    header("Location: acessa_quadrinho.php");
    exit();
?>