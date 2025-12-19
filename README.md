# projeto-mobile-2025.2
Repositório do projeto Sistema para Publicação e Leitura de Quadrinhos, desenvolvido para disciplina de Programação para Dispositivos Móveis do CEFET-MG Campus Leopoldina em 2025.2. 

# Descrição do Sistema
## SPLQ (Aplicativo React Native)
* Telas
  * CadastrarCapitulo.js
  * CadastrarObras.js
  * Cadastro.js
  * Capitulo.js
  * EditarCapitulo.js
  * EditarObra.js
  * Favoritos.js (vitor)
  * Historico.js (vitor)
  * Login.js
  * Perfil.js
  * PerfilEdicao.js
  * Pesquisa.js
  * Principal.js (vitor)
  * Quadrinho.js
* assets
* components
* App.js
## SPLQ_Server (Servidor PHP)
* backend
  * acessa_perfil.php
  * cadastro.php
  * capitulo.php
  * comentar.php
  * deleta_conta.php
  * editar_perfil.php
* bd
* content

Obs: onde está (vitor) significa o que foi implementado de relevante na branch do Vitor, estes arquivos estão disponíveis no arquivo ./projeto-mobile-2025.2-Vitor

Na brench do Vitor, ele tentou fazer as funcionalidades de cadastro, pesquisa, principal/tela de home, favoritos, histórico, cadastro/alteração de obra, cadastro/alteração de capitulos da obra. Detalhe importante, o pc do Vitor não conseguiua rodar o php com o expo, havia falha de comunicação, então os códigos dele eram mais de esboço, até porque a ideia das telas eram puxar/inserir no bd.

Tela: Cadastro.js/backend: cadastro.php: Pega os dados do formulário, mandava pro cadastro.php, ele validava e inseria no banco e criava uma pasta de usuario para ele. A ideia dessa pasta é para poder ter um sistema de arquivos pro usuarios, tipo “Usuarios/usuario_id/quadrinhos_id/capitulos/capitulo_id/arquivo.cbz”, assim poderiamos organizar o caminho do arquivo cbz(as imagens do quadrinho compactados) para os capitulos e pros quadrinhos do dono, para ser algo mais “intuitivo”, mas não conseguia criar essa pasta e quando criava parece que não era possível escrever, então era inutil.

Tela : Login.js/Login.php: Mesmo ideia, tem um formulário, manda pro login.php, ele valida e retorna uma reposta, se for sucesso, ele seta a variavel de contexto idUsu pro usuario logado e vai por principal.

Tela: Principal.js/listar_principal.php: A tela printa os quadrinhos que puxa do listar_principal.php, onde o php retorna uma lista de objetos e o principal cospe esse vetor de objetos com links, no caso todos os quarinhos é redirecinado para a tela quadrinho, e é mandado o id daquele quadrinho(idQua).

Tela: Favoritos/ Historico/ Pesquisa/ favoritos.php/ historico.php/ pesquisa.php: a ideia é o mesmo do principal, o frontend cospe os objetos retornado do backend, um vetor de objeto “formatado”. O único diferente seria o pesquisa, onde é enviado dois parâmetros(nome e tags) para buscar no banco eu histórico que encaminha pro capitulo ao invés de quadrinho.

Tela CadastrarObra/ EditarObra /cadastrar_obra.php/ editar_obra.php: inserção no banco através do formulário do front, mandando pro back. Tem erros de falta de validação de uniticidade e de não poder inserir foto da capa, é upada uma ft padrão no lugar. Também não segue a escrita de obra na pasta de usuarios, “Usuarios/usuario_id/quadrinhos/quadrinhos_id”.

Tela CadastrarCapitulo/ EditarCapitulo /cadastrar_capitulo.php/ editar_capitulo.php: inserção no banco através do formulário do front, mandando pro back. A inserção de arquivo cbz seria feito pelo picker, porém parece que o picker não funciona corretamente no expo, então teria que fazer um teste empirico se ele funcionaria

Quadrinho.js/quadrinho.php: a tela tem como objetivo objetivo exibir os dados do quadrinho selecionado, desde capa e autor, até os capítulos disponíveis. Para isso, é feito um fetch com método POST para o arquivo php no servidor backend, onde o mesmo recebe o id do quadrinho e faz as consultas no banco de dados, retornando os valores a ser exibidos com a impressão dos dados em formato json. Ainda nessa tela, são acessíveis botões para edição do quadrinho e dos capítulos, além da criação de novos, apenas se o id do usuário logado for o mesmo do publicador do quadrinho. 

Capitulo.js/capitulo.js/comentar.php: a tela tem como objetivo exibir as páginas de um capítulo de quadrinho, seja no modo webtoon (páginas seguidas na vertical) ou modo de páginas separadas. Para isso, através de um fetch com método POST para o arquivo php, enviado o id do capítulo, todas as informações do capítulo são requisitados do banco de dados, também analisando o arquivo do capítulo no formato .cbz, descompactando-o em imagens no servidor de arquivo em uma pasta temporária, enviando o link para cada arquivo de imagem junto com os outros dados do capítulo imprimindo em formato json. Ainda na tela, há uma sessão de comentários, ela não pode ser concluída, mas o backend foi criado, onde ao escrever um comentário, um fetch deveria chamar o arquivo php, que enviaria o comentário, obteria a lista atualizada dos comentários e imprimiria em json, onde na tela seria detectado os novos valores, sendo atualizado com useState e recarregado um useEffect. A troca de capítulos na própria tela começou a ser trabalhado, mas o progresso foi perdido após uma falha de hardware.

PerfilEdicao.js/editar_perfil.php/deleta_conta.php: A tela carrega uma imagem do sistema de arquivos do dispositivo escolhida pelo usuário. O usuário consegue editar seu nome e sua descrição, e deletar a sua conta. 

Perfil.js/acessa_perfil.php: Usuário consegue visualizar imagem, nome e descrição, além das obras de sua autoria publicadas na plataforma.
