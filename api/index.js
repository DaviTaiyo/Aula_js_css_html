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

/**********************************************************************
 * BUSCAR USUÁRIO POR ID
 * -------------------------------------------------
 * Método: GET
 * URL: http://localhost:3000/usuarios/:id
 * Exemplo: http://localhost:3000/usuarios/3
 * Objetivo: Buscar um único usuário pelo ID
 **********************************************************************/

app.get("/usuarios/:id", async (req, res) => {
    try {
        /*
        * req.params.id
        *captura o parâmetro que vem na URL.
        * Se a url for /usuario/2
        * então req.params.id será 2
        */
       const { id } = req.params
       /*
       * Executa a consulta SQL usando parâmetro ?
       * Isso evita SQL injection (boa prática de segurança)
       * O segundo argumento [id] substitui o ?
       */ 
      const [rows] = await db.query("SELECT * FROM usuario where id = ?;", [id]);
      /*
      *Se não encontrar nenhum registro rows será um array vazio.
      */
     if (rows.length === 0) {
        return res.status(404).json({
            erro: "USUARIO NÃO ENCONTRADO"
        });
    }
    /*
    * Se encontrou, retorna o primeiro registro.
    *(porque estamos buscando por ID, que é único)
    */
   res.json(rows[0]);
    } catch (err) {
        /*
        * Caso ocorra erro no servidor ou banco.
        */
        res.status(500).json({
            erro: "Erro ao buscar usuario",
            detalhe: err.message
        })
    } 
});

/**********************************************************************
 * CRIAR NOVO USUÁRIO
 * -------------------------------------------------
 * Método: POST
 * URL: http://localhost:3000/usuarios
 * Objetivo: Inserir um novo usuário no banco
 **********************************************************************/
app.post("/usuarios", async (req, res) => {
    try {
        const {nome, numero} = req.body;

        if (!nome || !numero) {
            return res.status(400).json({
                erro: "nome e ou numero são obrigatórios"
            });
        }

        const [result] = await db.query("insert into usuario (nome, numero) (?, ?):",
             [nome, numero]);

        res.status(201).json({
            mensagem: "Usuario criado com sucesso",
            id: result.insertId
        });
    } catch (err) {
        res.status(500).json({
            erro: "Erro ao inserir usuarios",
            detalhe: err.message
        })
    }
})

/**********************************************************************
 * DELETAR USUÁRIO POR ID
 * -------------------------------------------------
 * Método: DELETE
 * URL: http://localhost:3000/usuarios/:id
 * Exemplo: http://localhost:3000/usuarios/3
 * Objetivo: Remover um usuário do banco
 **********************************************************************/

app.put("/usuarios/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {nome, sobrenome} = req.body;

        if (!nome || !sobrenome) {
            return res.status(400).json({
                erro: "Nome e sobrenome são obrigatórios para atualizar"
            });
        }

        const [result] = await db.query("UPDATE usuario SET nome = ? email = ? id = ?;",
            [nome, sobrenome, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                erro: "Usuario não encontrado para atualizar"
            });
        }
        res.json({
            mensage: "usuario atualizado com sucesso"
        });
    } catch (err) {
        res.status(500).json({
            erro: "Erro ao atualizar usuario",
            detalhe: err.mensage
        });
    }
});
/**********************************************************************
 * DELETAR USUÁRIO POR ID
 * -------------------------------------------------
 * Método: DELETE
 * URL: http://localhost:3000/usuarios/:id
 * Exemplo: http://localhost:3000/usuarios/3
 * Objetivo: Remover um usuário do banco
 **********************************************************************/
app.delete("usuarios/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query("Delete from usuario where id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                erro: "Usuario nao encontrado para deletar"
            });
        }

        res.json({
            mensage: "Usuario Deletado com sucesso"
        });
    } catch (err) {
        res.status(500).json({
            erro: "erro ao deletar usuario",
            detalhe: err.message
        })
    }
})