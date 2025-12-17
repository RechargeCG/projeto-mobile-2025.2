-- Insere um novo usuário na tabela Usuario
-- A senha 'senha123' é armazenada como hash (usando a função PASSWORD() como exemplo)
INSERT INTO Usuario (nome, email, senha, descricao, fonte_foto, data_nascimento)
VALUES (
    'Exemplo User',
    'exemplo@email.com',
    -- Em um ambiente real, você usaria o hash PHP (e.g., password_hash('senha123', PASSWORD_DEFAULT))
    'HASH_DA_SENHA_AQUI', 
    'Um usuário de exemplo para o sistema.',
    '../usuarios/perfil.png',
    '1990-01-01'
);

-- Suponha que o ID do usuário criado seja 1
SET @idUsu = 1;

-- Define os dados do novo quadrinho
SET @nomeQua = 'A_Incrível_Aventura';
SET @autor = 'Autor Desconhecido';
SET @editora = 'Editora Fantasia';
SET @tag = 'Aventura,Fantasia';

-- Insere um novo quadrinho, referenciando o idUsu = 1
INSERT INTO Quadrinho (nome, autor, editora, descricao, fonte_capa, tag, fk_Usuario_idUsu)
VALUES (
    @nomeQua,
    @autor,
    @editora,
    'Uma descrição emocionante sobre as aventuras de um herói improvável.',
    -- Caminho da capa conforme a lógica de cria_quadrinho.php:
    '../quadrinhos/[1]/' + @nomeQua + '/capa.jpg',
    @tag,
    @idUsu
);

-- Suponha que o ID do quadrinho criado seja 10
SET @idQua = 1;

-- Define os dados do novo capítulo
SET @numCap = 1;

-- Insere um novo capítulo, referenciando o idQua = 10
INSERT INTO Capitulo (numCap, fonte, visualizacao, fk_Quadrinho_idQua, data)
VALUES (
    @numCap,
    -- Caminho do arquivo .cbz conforme a lógica de cria_capitulo.php:
    '../quadrinhos/[1]/A_Incrível_Aventura/1.cbz',
    0,
    @idQua,
    NOW()
);

-- Suponha que o ID do capítulo criado seja 50
SET @idCap = 1;

-- Insere um novo comentário, referenciando o idCap = 50 e o idUsu = 1
INSERT INTO Comentario (texto, fk_Capitulo_idCap, fk_Usuario_idUsu, data)
VALUES (
    'Ótimo primeiro capítulo! Mal posso esperar pelo próximo.',
    @idCap,
    @idUsu,
    NOW()
);
