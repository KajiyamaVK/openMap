
<img src='./OpenmapFront/public/images/logoxl.png' width="200"/>

><br>
>Este projeto visa demonstrar o uso básico de um frontend efetuando comunicação com um backend por meio de uma API em C# que efetua todo o processo CRUD no servidor. 
><br><br>
>


##Techs utilizadas
![Stacks utilizadas](OpenmapFront/public/images/Stacks%20Display.png)

   
- [1. Descrição da aplicação](#1-descrição-da-aplicação)
- [2. Do que é composto cada pasta presente aqui no repositório?](#2-do-que-é-composto-cada-pasta-presente-aqui-no-repositório)
  - [Front-end](#front-end)
  - [Back-end](#back-end)
- [3. Conceitos](#3-conceitos)
  - [O que significa CRUD?](#o-que-significa-crud)
  - [O que é Requisição HTTP?](#o-que-é-requisição-http)
- [4. Como rodar a aplicação](#4-como-rodar-a-aplicação)
- [5. Ações simples da aplicação](#5-ações-simples-da-aplicação)
  - [Pesquisa](#pesquisa)
  - [Como cadastrar um novo local?](#como-cadastrar-um-novo-local)
  - [Como editar ou excluir um cadastro?](#como-editar-ou-excluir-um-cadastro)
  
# 1. Descrição da aplicação

O cenário proposto na aplicação seria efetuar a criação de uma interface onde é possível cadastrar,excluir,editar e pesquisar pontos turísticos. 

# 2. Do que é composto cada pasta presente aqui no repositório?

O projeto foi dividido em 2 partes compostas por: 

## Front-end 

></br>
>Pasta: OpenMapFront
></br></br>

Na etapa de Front-end foi utilizada a linguagem Javascript com seus frameworks ReactJS / NextJS. Typescripts foi instalado para facilitar na etapa de desenvolvimento, pois, sua instação permite que possamos estar consultando informações sobre propriedades de objetos e argumentos de funções - porém, a finalidade de tipagem não foi utilizada devido à simplicidade do projeto. 

Foi utilizada a biblioteca de componentes MUI (Material-UI) basicamente por todo o projeto. O foco do estudo é para efetuar a utilização de requisições HTTP, portanto, não foi dado o foco total ao desenvolvimento de UI por forma de templates. 

## Back-end

></br>
>Pasta: OpenMapApi
></br></br>

Aqui é onde é mantida a Controller da API na linguagem C#. Controller é o componente que controla todo o recebimento e respostas das requisições HTTP. Ao receber a requisição, ele vai ser o componente responsável por acionar o repositório para buscar a ação correta que o código deve acionar. 

**Importante ressaltar que será nessa pasta que a configuração da comunicação com o banco de dados SQL SERVER deverá ser feita. Instruções sobre como rodar a aplicação se encontra mais abaixo - vide índice.**

></br>
>Pasta: OpenMapRepo
></br></br>

Aqui estará localizada a pasta de repositório. O repositório é o local responsável por manter os métodos responsáveis pelas ações de um CRUD. 

# 3. Conceitos

## O que significa CRUD? 

CRUD é a sigla em inglês para Create, Read, Update e Delete. É um termo usado para se referir às operações básicas de manipulação de dados em uma base de dados ou em uma API.

**Create:** Criação de um novo registro ou recurso. Por exemplo, um usuário pode enviar uma requisição para criar um novo produto em uma loja online, enviando os dados do produto em um formulário.
**Read:** Leitura de um registro ou recurso existente. Por exemplo, um usuário pode enviar uma requisição para visualizar os detalhes de um produto específico em uma loja online.
**Update:** Atualização de um registro ou recurso existente. Por exemplo, um usuário pode enviar uma requisição para alterar o preço de um produto em uma loja online.
**Delete:** Exclusão de um registro ou recurso existente. Por exemplo, um usuário pode enviar uma requisição para excluir um produto da lista de produtos em uma loja online.

As operações CRUD são comumente usadas em aplicativos web e APIs para gerenciar os dados de um sistema. Por exemplo, se você tiver uma API REST para gerenciar uma lista de tarefas, poderá usar os métodos CRUD para criar novas tarefas, ler as tarefas existentes, atualizar as tarefas e excluir as tarefas da lista.

## O que é Requisição HTTP?

Uma requisição HTTP é uma solicitação enviada por um cliente (como um navegador web ou um aplicativo) para um servidor para realizar uma ação específica. As requisições HTTP são usadas para fazer várias coisas, como buscar uma página da web, enviar dados para um formulário online, fazer login em uma conta, entre outras.

Cada requisição HTTP é composta por vários elementos, como o método HTTP, o caminho da URL, os cabeçalhos HTTP e o corpo da mensagem (se houver). O servidor recebe a requisição e, em seguida, envia uma resposta HTTP de volta para o cliente.

Em APIs REST temos os seguintes métodos: 

Os principais métodos HTTP REST e para que eles são usados são os seguintes:

**GET:** O método GET é usado para ler dados de um recurso específico. Quando o método GET é usado, nenhum corpo é enviado com a solicitação e os dados são passados na URL como parâmetros de consulta. O método GET é usado para recuperar informações sobre um recurso, mas não deve ser usado para alterar o estado de um recurso.

**POST:** O método POST é usado para criar um novo recurso. Quando o método POST é usado, os dados são enviados no corpo da solicitação e um novo recurso é criado no servidor. O método POST é usado para enviar dados para serem processados e armazenados no servidor.

**PUT:** O método PUT é usado para atualizar um recurso existente. Quando o método PUT é usado, os dados são enviados no corpo da solicitação e o recurso é atualizado com esses dados. O método PUT é usado para substituir todos os dados de um recurso existente com novos dados.

**DELETE:** O método DELETE é usado para excluir um recurso existente. Quando o método DELETE é usado, nenhum corpo é enviado com a solicitação e o recurso é excluído do servidor. O método DELETE é usado para excluir um recurso existente.

**PATCH:** O método PATCH é usado para atualizar parcialmente um recurso existente. Quando o método PATCH é usado, os dados são enviados no corpo da solicitação e o recurso é atualizado com esses dados. O método PATCH é usado para atualizar apenas uma parte de um recurso existente, em vez de substituir todos os dados do recurso.


# 4. Como rodar a aplicação

Por este projeto ser apenas de estudo, ele não está hospedado em nenhum local. Para rodar a aplicação localmente, você deverá ter instalado em sua máquina as seguintes ferramentas (as versões citadas foram as utilizadas, porém, versões anteriores podem ou não rodar a aplicação sem maiores problemas.)

**SQL Server 2019**
**Node 18.12.1**
**Asp .NET Core 7.0**

**1.** Clone o repositório em um diretório de sua escolha. 
**2.** Para facilitar o processo de criação do banco de dados, foi feito um backup e anexado a este repositório com o nome **Modelo.bak**. Este pode ser restaurado no SGBD. 
**3.** Abra a pasta **OpenMapAPI** e edite o arquivo **appsettings.json** e edite a string de conexão conforme a instância instalada em sua máquina. 
**4.** Rode a aplicação C# utilizando o Visual Studio ou seu editor de código. Assim, o servidor backend deverá estar em funcionamento.
**5.** Utilizando Node na versão 18.12, navegue até o diretório da pasta OpenMapFront e rode o **NPM INSTALL**
**6.** Execute o Node em modo de desenvolvimento com **NPM RUN DEV**, assim, o projeto do site (front-end) será iniciado. 
**7.** Abra o navegador e digite **localhost:3000** - a página deverá se abrir. 


# 5. Ações simples da aplicação

## Pesquisa

A pesquisa leva dois campos em consideração: Nome e descrição do ponto turístico. O sistema procura por termos digitados, ou seja, ele leva a frase digitada e não as palavras soltas. 

Clicando em Pesquisar sem nenhum valor, irá retornar uma listagem completa dos locais. 

Os resultados serão apresentados em páginas contendo 20 locais cada uma, podendo o usuário estar navegando entre as páginas na barra logo após os resultados. 

## Como cadastrar um novo local? 

No canto superior direito existe o link para cadastro. Clique nele e você entrará no formulário de cadastro

## Como editar ou excluir um cadastro? 

Ao pesquisar os pontos turísticos, os cards dos locais aparecerão em tela. Clique na seta presente no cartão para abrir essas duas opções. 
