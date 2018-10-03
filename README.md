# InstaNEWS

API de noticias

# Instalação

## Requisitos

* NodeJS
* MySQL
* MySQLWorkbench (Recomendado)
* PHPMyAdmin (Recomendado)

## Servidor local
* Fazer um `git clone` ou `git pull` do repositorio
* Criar um database com um nome a sua escolha no sql
* Importar o `Dummy Dump.sql` para sua database
* Configurar o arquivo `routes\db.js`, com o seu usuario e senha do banco de dados
* Executar `npm install`
* Caso deseje mudar a porta que o Node executa, mudar o arquivo `bin\www`, mudando o valor da variavel `"port"` de 3001 para uma porta a sua escolha
* Para executar com live reload use o comando `npm start watch`
* Para executar SEM live reload execute o comand `npm start`




# URLs
 
## Login 

Metodo | Path | Descricao | JSON
--- | --- | --- | ---
POST  | /login | Faz login do user com base no email | {"email" : "`<email>`"}
DELETE | /login | Invalida o token do user

## Categories 

Metodo | Path | Logado | Não Logado | JSON
--- | --- | --- | --- | ---  
GET | /categories | Retorna todas as categorias | Retorna todas as categorias do usuario |
POST| /categories | Adiciona categorias no usuario |  | { "categories" : [`<ID CATEGORIAS>`] }


## NEWS 

Todas as requisicoes requerem o header authorization

Metodo | Path | Descricao
--- | --- | ---
GET |  /news/subs | Retorna as noticias em que o usuario esta inscrito
GET |  /news/breaking | Retorna as ultimas noticias
GET |  /news/like/`<palavra chave>` | Retorna as noticias que contenham a palavra chave no titulo
GET |  /news/category/`<ID cat>` | Retorna as noticias da categoria


## Subs 

Metodo | Path | Logado | Não Logado | JSON
--- | --- | --- | --- | --- 
GET | /subs | Retorna todos os feeds de noticia possiveis | Retorna as inscroes do usuario | 
POST| /subs | Adiciona os feeds de noticias ao usuario |  | {"subs": [`<ID FEED>`]}
DELETE | /subs | Remove TODAS as incricoes do usuario |  |  


## Usuario 
Todas as requisicoes requerem o header authorization

Metodo | Path | Descricao | JSON
--- | --- | --- | --- 
GET | /user | Retorna algumas informacoes do usuario
POST| /user | Adiciona usuario | {"email": "`<email>`"}
DELETE | /user | Deleta o usuario

 