# InstaNEWS

API de noticias


# URLs

## Usuario 

Metodo | Path | Descricao
--- | --- | ---
GET | /user/ `EMAIL` | retorna o token do usuario
POST| /user | email no body do request, adiciona o usuario e retorna o token


## Categorias

Metodo | Path | Descricao
--- | --- | ---
GET | /categories/| retorna todas as categorias disponiveis
GET | /categories/ `TOKEN` | retorna as categorias do usuario
 

## Noticias

Metodo | Path | Descricao
--- | --- | ---
GET | /news/| retorna todas as 20 ultimas noticias
GET | /news/ `TOKEN` | Retorna as ultimas noticias do usuario com base nas categorias dele
