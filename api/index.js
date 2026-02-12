/**********************************************************************
 * ARQUIVO PRINCIPAL DA API (server.js ou index.js)
 * -------------------------------------------------
 * Este arquivo é responsável por:
 * 1️⃣ Criar o servidor usando Express
 * 2️⃣ Configurar middlewares
 * 3️⃣ Criar rotas da API
 * 4️⃣ Iniciar o servidor
 **********************************************************************/

// Importa o framework Express (criação da API)
const express = require("express");

// Importa o CORS (permite que o front-end acesse a API)
const cors = require("cors");

// Importa o arquivo de conexão com o banco (pool MySQL)
const db = require("./src/db");

// Cria a aplicação Express
const app = express();

/*
 * Middleware CORS
 * Permite que aplicações externas (ex: React, HTML local)
 * consigam fazer requisições para esta API.
 */
app.use(cors());

/*
 * Middleware para permitir que a API receba JSON no corpo da requisição.
 * Sem isso, o Express não entende req.body.
 */
app.use(express.json());

/**********************************************************************
 * HEALTH CHECK
 * -------------------------------------------------
 * Rota simples para testar se a API está funcionando.
 * Método: GET
 * URL: http://localhost:3000/
 **********************************************************************/
app.get("/", (req, res) => 
    // Retorna um objeto JSON informando que a API está ativa
    res.json({ ok: true, msg: "API ESTA RODANDO" })
);


/**********************************************************************
 * LISTAR USUÁRIOS
 * -------------------------------------------------
 * Método: GET
 * URL: http://localhost:3000/usuarios
 * Objetivo: Buscar todos os usuários do banco de dados
 **********************************************************************/
app.get("/usuarios", async (req, res) => {

    try {

        /*
         * Executa a consulta SQL no banco.
         * db.query retorna um array:
         * [rows, fields]
         * 
         * Estamos pegando apenas o primeiro elemento (rows),
         * que contém os registros retornados.
         */
        const [rows] = await db.query("select * from usuario;");

        // Retorna os dados em formato JSON
        res.json(rows);

    } catch (err) {

        /*
         * Caso ocorra erro (ex: banco desconectado, tabela inexistente),
         * retornamos status 500 (erro interno do servidor)
         */
        res.status(500).json({
            erro: "ERRO AO LISTAR USUARIOS",
            detalhe: err.message
        });
    }
});


/**********************************************************************
 * INICIAR SERVIDOR
 * -------------------------------------------------
 * Faz a API começar a escutar requisições na porta 3000
 **********************************************************************/
app.listen(3000, () => 
    console.log("API esta rodando em http://localhost:3000")
);
