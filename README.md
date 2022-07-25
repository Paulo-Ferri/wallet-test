# Desafio técnico XP INC - Carteira de ativos! 

## Descrição do Projeto
<p>Esse projeto foi realizado com a finalidade de demonstrar as habilidades técnicas para o processo seletivo da XP INC!</p>
<p>A aplicação consiste em uma carteira de investimentos, sendo possível o depósito e o saque de fundos, bem como a compra e venda de ações.</p>
<p>Além disso, ela consome uma API externa desenvolvida com a finalidade de possibilitar a criação de novos usuários, autenticação para o login, a listagem de todas as ações disponíveis e também a listagem das ações do usuário logado.</p>
<p>A aplicação também está no ar através do endereço https://pauloafonso-wallet-test.vercel.app/</p>

### Tomada de decisões
<p>Primeiramente, decidi pela criação de uma API para garantir a melhor funcionalidade do sistema, aproximando-se ao máximo de uma aplicação real. Dessa forma, é possível a criação de usuários e armazenamento das operações realizadas, ancorados ao banco de dados.</p>
<p>Além de um visual limpo e característico no desktop, a aplicação conta com responsividade, podendo ser utilizada também no mobile. Essa decisão foi imprescindível diante da realidade do uso da internet pelo brasileiro, com maior aderência ao celular para navegar na rede do que ao próprio computador.</p>
<p>A aplicação foi desenvolvida em React e o Back-End utiliza a ORM Sequelize com Node.JS.</p>
<p>Para o gerenciamento do estado da aplicação, utilizei o Context API em vez de ferramentas mais robustas, como o Redux, visto que a aplicação se baseia principalmente em chamadas à API, mais do que em movimentações de informações entre a árvore de componentes.</p>

### Como instalar e executar a aplicação

É necessário ter as seguintes ferramentas para o funcionamento da aplicação:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), e um editor de código, como recomendação o [VSCode](https://code.visualstudio.com/)

```bash
# Clone esse repositório
$ git clone git@github.com:Paulo-Ferri/wallet-test.git

# Acesse a pasta do projeto com o comando
$ cd wallet-test

# Instale as dependências
$ npm install

# Inicie a aplicação
$ npm start

# Agora o site estará no ar! Você pode acessá-lo em localhost:3000
```
