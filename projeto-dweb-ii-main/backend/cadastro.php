<?php 
    //Cria conexão com o banco de dados
    session_start();
    require_once("conexao.php");
    $bd = new BD();
    $conexao = $bd->criarConexao();

    //Obtém os dados da página de cadastro do usuário
    $nome = mysqli_real_escape_string($conexao, $_POST['nome']);
    $email = mysqli_real_escape_string($conexao, $_POST['email']);
    $cemail = mysqli_real_escape_string($conexao, $_POST['cemail']);
    $senha = mysqli_real_escape_string($conexao, $_POST['senha']);
    $csenha = mysqli_real_escape_string($conexao, $_POST['csenha']);

    //Verifica se algum dado não foi preenchido
    if (empty($nome) || empty($email) || empty($senha) || empty($cemail) || empty($csenha)) {
        $_SESSION['erro'] = 'Preencha todos os campos';
        header('Location: ../pages/cadastro/');
        exit();
    }

    //Verifica se o email digitado é válido, e se a confirmação de email coincide 
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || $email != $cemail) {
        $_SESSION['erro'] = 'E-mail inválido ou não coincidem';
        header('Location: ../pages/cadastro/');
        exit();
    }

    //Verifica se a confirmação de senha coincide
    if($senha != $csenha){
        $_SESSION['erro'] = 'Senhas não coincidem';
        header('Location: ../pages/cadastro/');
        exit();
    }

    //Obtém dados de usuário do banco através do email digitado para evitar criação de conta com email já existente
    $query = $conexao->prepare("SELECT * FROM usuario WHERE email = ? LIMIT 1");
    $query->bind_param("s", $email);
    $query->execute();
    $result = $query->get_result()->fetch_assoc();
    if ($result) {
        $_SESSION['erro'] = 'E-mail já cadastrado';
        header('Location: ../pages/cadastro/');
        exit();
    }

    //Aplica uma criptografia à senha digitada e tenta registrar o usuário no banco de dados
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);
    $inserir = $conexao->prepare("INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)");
    $inserir->bind_param("sss", $nome, $email, $senhaHash);

    //Redireciona o usuário para a página de login caso o cadastro seja realizado com sucesso.
    if ($inserir->execute()) {
        header('Location: ../pages/login/');
        exit();
    } else {
        $_SESSION['erro'] = 'Erro ao cadastrar. Tente novamente.';
        header('Location: ../pages/cadastro/');
        exit();
    }
?>