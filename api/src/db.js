/**********************************************************************
 * ARQUIVO DE CONEXÃO COM BANCO DE DADOS (MySQL)
 * ------------------------------------------------
 * Este arquivo é responsável por:
 * 1️ Criar uma conexão com o banco MySQL
 * 2️ Utilizar um POOL de conexões (melhor prática)
 * 3️ Exportar essa conexão para ser usada em todo o projeto
 **********************************************************************/

// Importa a biblioteca mysql2 na versão que suporta Promise (async/await)
const mysql = require("mysql2/promise");

/*
 * Criação do POOL de conexões
 * ----------------------------
 * Um pool mantém várias conexões abertas e reutiliza elas.
 * Isso evita abrir e fechar conexão a cada requisição,
 * melhorando desempenho e escalabilidade.
 */
const pool = mysql.createPool({

    // Endereço onde o banco está rodando
    // "localhost" significa que está na própria máquina
    host: "localhost",

    // Usuário do banco de dados
    // "root" é o padrão do MySQL local
    user: "root",

    // Senha do banco (vazia no ambiente local)
    //  Em produção deve usar variável de ambiente
    password: "",

    // Nome do banco que será utilizado
    database: "projetointegrador",

    /*
     * waitForConnections:
     * Se todas as conexões estiverem ocupadas,
     * ele espera liberar uma ao invés de gerar erro.
     */
    waitForConnections: true,

    /*
     * connectionLimit:
     * Número máximo de conexões simultâneas abertas.
     * Aqui estamos permitindo até 10 conexões ao mesmo tempo.
     */
    connectionLimit: 10,

    /*
     * queueLimit:
     * Limite de requisições aguardando na fila.
     * 0 significa fila ilimitada.
     */
    queueLimit: 0
});

/*
 * Exporta o pool para ser usado em outros arquivos do projeto.
 * Assim podemos fazer:
 *
 * const pool = require("./db");
 * const [rows] = await pool.query("SELECT * FROM usuarios");
 */
module.exports = pool;
