# Rede Social Backend

> Repositório contendo um Backend e frontend didático de uma rede social.

### Avisos

Usar apenas para desenvolvimento local. Adaptações são necessárias caso deseje publicar o website em produção.

## 💻 Pré-requisitos

Antes de começar, verifique que sua máquina possua:

- Docker

## 🚀 Executando

Com o terminal (ou prompt de comando), entre na pasta do repositório e digite o seguinte comando:

```
docker compose up --build -d
```

## Reiniciando o servidor

Caso queira reiniciar o servidor em algum momento, sem perder os arquivos desenvolvidos, execute os seguintes comandos...

```
docker compose down
docker compose up --build -d
```

## Desenvolvimento do frontend

O projeto React do frontend está na pasta `frontend`. Qualquer alteração no projeto resultará na atualização automática do projeto (*hot-reload*). Caso haja algum problema imprevisto, realize o processo de reinicialização do servidor. 

## ☕ Endereços para acesso

O endereço base para o backend e sua documentação é:

```
http://localhost:3000
```


A página inicial do website React pode ser encontrada em:

```
http://localhost:5173
```

