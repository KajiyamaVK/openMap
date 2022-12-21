
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
  - [Como efetuar uma pesquisa?](#como-efetuar-uma-pesquisa)
  - [Como cadastrar um novo local?](#como-cadastrar-um-novo-local)
  
# 1. Descrição da aplicação

O cenário proposto na aplicação seria efetuar a criação de uma interface onde é possível cadastrar,excluir,editar e pesquisar pontos turísticos. 

# 2. Do que é composto cada pasta presente aqui no repositório?

O projeto foi dividido em 3 partes compostas por: 

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

###O que é Requisição HTTP?

Uma requisição HTTP é uma solicitação enviada por um cliente (como um navegador web ou um aplicativo) para um servidor para realizar uma ação específica. As requisições HTTP são usadas para fazer várias coisas, como buscar uma página da web, enviar dados para um formulário online, fazer login em uma conta, entre outras.

Cada requisição HTTP é composta por vários elementos, como o método HTTP, o caminho da URL, os cabeçalhos HTTP e o corpo da mensagem (se houver). O servidor recebe a requisição e, em seguida, envia uma resposta HTTP de volta para o cliente.

Em APIs REST temos os seguintes métodos: 

Os principais métodos HTTP REST e para que eles são usados são os seguintes:

**GET:** O método GET é usado para ler dados de um recurso específico. Quando o método GET é usado, nenhum corpo é enviado com a solicitação e os dados são passados na URL como parâmetros de consulta. O método GET é usado para recuperar informações sobre um recurso, mas não deve ser usado para alterar o estado de um recurso.

**POST:** O método POST é usado para criar um novo recurso. Quando o método POST é usado, os dados são enviados no corpo da solicitação e um novo recurso é criado no servidor. O método POST é usado para enviar dados para serem processados e armazenados no servidor.

**PUT:** O método PUT é usado para atualizar um recurso existente. Quando o método PUT é usado, os dados são enviados no corpo da solicitação e o recurso é atualizado com esses dados. O método PUT é usado para substituir todos os dados de um recurso existente com novos dados.

**DELETE:** O método DELETE é usado para excluir um recurso existente. Quando o método DELETE é usado, nenhum corpo é enviado com a solicitação e o recurso é excluído do servidor. O método DELETE é usado para excluir um recurso existente.

**PATCH:** O método PATCH é usado para atualizar parcialmente um recurso existente. Quando o método PATCH é usado, os dados são enviados no corpo da solicitação e o recurso é atualizado com esses dados. O método PATCH é usado para atualizar apenas uma parte de um recurso existente, em vez de substituir todos os dados do recurso.



**Importante ressaltar que será nessa pasta que a configuração da comunicação com o banco de dados SQL SERVER deverá ser feita.**

## Como efetuar uma pesquisa?

A pesquisa leva dois campos em consideração: Nome e descrição do ponto turístico. O sistema procura por termos digitados, ou seja, ele leva a frase digitada e não as palavras soltas. 

Clicando em Pesquisar sem nenhum valor, irá retornar uma lisgem completa dos locais. 

Os resultados serão apresentados em páginas contendo 20 locais cada uma, podendo o usuário estar navegando entre as páginas na barra logo após os resultados. 

## Como cadastrar um novo local? 
