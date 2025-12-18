CREATE TABLE Usuario (
    idUsu INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(280),
    email VARCHAR(280),
    senha VARCHAR(280),
    descricao VARCHAR(1000),
    fonte_foto VARCHAR(280),
    data_nascimento DATE
);

CREATE TABLE Quadrinho (
    idQua INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(280),
    autor VARCHAR(280),
    editora VARCHAR(280),
    descricao VARCHAR(1000),
    fonte_capa VARCHAR(280),
    tag VARCHAR(280),
    status BOOLEAN,
    fk_Usuario_idUsu INT,
    FOREIGN KEY (fk_Usuario_idUsu) REFERENCES Usuario (idUsu) ON DELETE CASCADE
);

CREATE TABLE Capitulo (
    idCap INT PRIMARY KEY AUTO_INCREMENT,
    numCap INT,
    fonte VARCHAR(280),
    visualizacao INT,
    fk_Quadrinho_idQua INT,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    status BOOLEAN,
    FOREIGN KEY (fk_Quadrinho_idQua) REFERENCES Quadrinho (idQua) ON DELETE CASCADE
);

CREATE TABLE Comentario (
    idCom INT PRIMARY KEY AUTO_INCREMENT,
    texto VARCHAR(280),
    fk_Capitulo_idCap INT,
    fk_Usuario_idUsu INT,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    status BOOLEAN,
    FOREIGN KEY (fk_Capitulo_idCap) REFERENCES Capitulo (idCap) ON DELETE CASCADE,
    FOREIGN KEY (fk_Usuario_idUsu) REFERENCES Usuario (idUsu) ON DELETE CASCADE
);

CREATE TABLE Favorito (
    fk_Usuario_idUsu INT,
    fk_Quadrinho_idQua INT,
    FOREIGN KEY (fk_Usuario_idUsu) REFERENCES Usuario (idUsu) ON DELETE CASCADE,
    FOREIGN KEY (fk_Quadrinho_idQua) REFERENCES Quadrinho (idQua) ON DELETE CASCADE
);

CREATE TABLE Historico (
    fk_Usuario_idUsu INT,
    fk_Capitulo_idCap INT,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_Usuario_idUsu) REFERENCES Usuario (idUsu) ON DELETE CASCADE,
    FOREIGN KEY (fk_Capitulo_idCap) REFERENCES Capitulo (idCap) ON DELETE CASCADE
);
