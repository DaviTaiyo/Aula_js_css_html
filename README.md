# Aula de HTML, CSS e JavaScript

## PT-BR

Projeto de estudo com duas frentes complementares:

- uma pagina principal para praticar HTML, CSS e manipulacao do DOM com JavaScript;
- um painel CRUD que consome uma API REST feita com Express e MySQL.

O objetivo deste repositorio e reunir exercicios comuns de uma aula introdutoria e apresentar uma versao final mais organizada, funcional e pronta para demonstracao.

### O que o projeto faz

- alterna tema claro e escuro na pagina principal;
- altera conteudo dinamicamente com JavaScript;
- adiciona e remove tarefas com persistencia no `localStorage`;
- consome a rota principal da API diretamente pelo frontend da raiz;
- oferece uma interface CRUD para listar, buscar, inserir, atualizar e deletar usuarios;
- expoe uma API REST em Node.js com Express e conexao MySQL.

### Estrutura

- `index.html`, `style.css`, `script.js`: pagina principal da aula
- `Frontend/`: interface CRUD para testes manuais da API
- `api/`: backend Express com rotas de usuarios

### Como executar

#### 1. Frontend da raiz

Abra o arquivo `index.html` no navegador.

#### 2. Painel CRUD

Abra `Frontend/index.html` no navegador.

#### 3. API

Entre na pasta `api` e execute:

```bash
npm install
npm run dev
```

ou:

```bash
npm start
```

A API sera iniciada em `http://localhost:3000`.

### Banco de dados esperado

O backend foi preparado para conectar em um banco MySQL com os valores padrao:

- host: `localhost`
- user: `root`
- password: vazio
- database: `projetointegrador`

Tabela esperada:

```sql
CREATE TABLE usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  sobrenome VARCHAR(100) NULL,
  numero VARCHAR(50) NOT NULL
);
```

Tambem e possivel usar variaveis de ambiente no backend:

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `PORT`

### Melhorias aplicadas

- correcao de textos com encoding quebrado;
- correcao das rotas CRUD e queries SQL;
- validacoes basicas de entrada no backend;
- conclusao das operacoes faltantes no frontend CRUD;
- melhoria visual e responsiva nas duas interfaces;
- persistencia de tarefas com `localStorage`;
- adicao de `.gitignore` e documentacao.

---

## EN

Study project with two complementary parts:

- a main page to practice HTML, CSS, and DOM manipulation with JavaScript;
- a CRUD panel that consumes a REST API built with Express and MySQL.

The goal of this repository is to gather common introductory class exercises and present them in a cleaner, more functional, demo-ready final version.

### What the project does

- toggles light and dark themes on the main page;
- updates content dynamically with JavaScript;
- adds and removes tasks with `localStorage` persistence;
- consumes the API root endpoint directly from the main frontend;
- provides a CRUD interface to list, fetch, create, update, and delete users;
- exposes a REST API built with Node.js, Express, and MySQL.

### Structure

- `index.html`, `style.css`, `script.js`: main lesson page
- `Frontend/`: CRUD interface for manual API testing
- `api/`: Express backend with user routes

### How to run

#### 1. Main frontend

Open `index.html` in your browser.

#### 2. CRUD panel

Open `Frontend/index.html` in your browser.

#### 3. API

Go to the `api` folder and run:

```bash
npm install
npm run dev
```

or:

```bash
npm start
```

The API will start at `http://localhost:3000`.

### Expected database

The backend is configured to connect to a MySQL database using the default values below:

- host: `localhost`
- user: `root`
- password: empty
- database: `projetointegrador`

Expected table:

```sql
CREATE TABLE usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  sobrenome VARCHAR(100) NULL,
  numero VARCHAR(50) NOT NULL
);
```

You can also configure the backend with environment variables:

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `PORT`

### Improvements made

- fixed broken text encoding issues;
- corrected CRUD routes and SQL queries;
- added basic backend input validation;
- completed missing CRUD actions in the frontend;
- improved both interfaces with a more polished responsive layout;
- added task persistence with `localStorage`;
- added `.gitignore` and project documentation.
