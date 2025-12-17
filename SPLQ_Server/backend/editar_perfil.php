<?php
    session_start();
    require_once("conexao.php");
    $conexao = new BD();
    $conexao = $conexao->criarConexao();

    // Convertendo para inteiro para garantir segurança do ID
    $id = intval($_SESSION['id']); 

    // Função de atualização genérica usando Prepared Statements
    function atualizarCampo($conexao, $campo, $valor, $id) {
        // Uso de '?' como placeholder para o valor
        $stmt = $conexao->prepare("UPDATE usuario SET $campo = ? WHERE idUsu = ?");
        
        // Liga os parâmetros: 's' para string, 'i' para integer
        // Note que o $campo (nome da coluna) não é ligado, por isso deve ser validado/fixo.
        $stmt->bind_param("si", $valor, $id); 
        
        if ($stmt->execute()) {
            // Sucesso
            $stmt->close();
            return true;
        } else {
            // Erro
            error_log("Erro na atualização do campo $campo: " . $stmt->error);
            $stmt->close();
            return false;
        }
    }

    // --- Atualização de Nome ---
    if(isset($_POST['nome'])){
        $nome = trim($_POST['nome']); // Limpa espaços em branco
        atualizarCampo($conexao, "nome", $nome, $id);
    }
    
    // --- Atualização de Descrição ---
    if(isset($_POST['descricao'])){
        $descricao = trim($_POST['descricao']);
        atualizarCampo($conexao, "descricao", $descricao, $id);
    }

    // --- Processamento de Imagem (Upload) ---
    if(isset($_FILES['imagem']) && $_FILES['imagem']['error'] === UPLOAD_ERR_OK){
        $arquivo = $_FILES['imagem'];
        $arquivoNome = $arquivo['name'];
        $arquivoTmpNome = $arquivo['tmp_name'];
        $arquivoExt = pathinfo($arquivoNome, PATHINFO_EXTENSION);
        $arquivoExtReal = strtolower($arquivoExt);
        $permitido = array('jpg','jpeg','png','gif');

        if(in_array($arquivoExtReal, $permitido)){
            
            // Define e cria o caminho do diretório para a imagem de perfil
            $diretorioDestino = "../bd/usuarios/$id";
            if (!is_dir($diretorioDestino)) {
                // Cria o diretório com permissões 0777 recursivamente
                if (!mkdir($diretorioDestino, 0777, true)) { 
                    error_log("Falha ao criar diretório: $diretorioDestino");
                    // Continue com o tratamento de erro se necessário
                }
            }

            // Define o nome final do arquivo de perfil
            $arquivoDestinoLocal = "$diretorioDestino/perfil.$arquivoExtReal";
            $arquivoDestinoDB = "../$diretorioDestino/perfil.$arquivoExtReal"; // Caminho para salvar no DB

            // Move o arquivo para o destino
            if (move_uploaded_file($arquivoTmpNome, $arquivoDestinoLocal)){
                // Atualiza o banco de dados com o caminho da imagem
                atualizarCampo($conexao, "fonte_foto", $arquivoDestinoDB, $id);
            }
            else {
                error_log("Erro ao mover arquivo para: $arquivoDestinoLocal");
            }
        }
        else {
            error_log("Extensão de arquivo não permitida: $arquivoExtReal");
        }
    }
    // ... O seu tratamento de erro para imagem é simplificado aqui
    // ... mas você pode retornar mensagens JSON para o React Native para um feedback melhor.


    // Como o React Native não segue o cabeçalho 'Location' do fetch, 
    // ele deve ser tratado no lado do cliente.
    // Você pode retornar um JSON de sucesso em vez de redirecionar imediatamente.
    // Para manter a compatibilidade com o seu código original, apenas redirecionamos:
    header('Location: acessa_perfil.php');
    exit();
?>