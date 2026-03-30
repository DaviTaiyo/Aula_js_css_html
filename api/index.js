const express = require("express");
const cors = require("cors");
const db = require("./src/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "API em execucao",
    endpoints: [
      "GET /usuarios",
      "GET /usuarios/:id",
      "POST /usuarios",
      "PUT /usuarios/:id",
      "DELETE /usuarios/:id",
    ],
  });
});

app.get("/usuarios", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM usuario ORDER BY id ASC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao listar usuarios.",
      detail: error.message,
    });
  }
});

app.get("/usuarios/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Informe um ID valido." });
    }

    const [rows] = await db.query("SELECT * FROM usuario WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario nao encontrado." });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar usuario.",
      detail: error.message,
    });
  }
});

app.post("/usuarios", async (req, res) => {
  try {
    const { nome, sobrenome = "", numero } = req.body;

    if (!nome || !numero) {
      return res.status(400).json({
        error: "Os campos nome e numero sao obrigatorios.",
      });
    }

    const [result] = await db.query(
      "INSERT INTO usuario (nome, sobrenome, numero) VALUES (?, ?, ?)",
      [nome.trim(), sobrenome.trim(), String(numero).trim()]
    );

    res.status(201).json({
      message: "Usuario criado com sucesso.",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      error: "Erro ao criar usuario.",
      detail: error.message,
    });
  }
});

app.put("/usuarios/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nome, sobrenome = "", numero } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Informe um ID valido." });
    }

    if (!nome || !numero) {
      return res.status(400).json({
        error: "Os campos nome e numero sao obrigatorios para atualizar.",
      });
    }

    const [result] = await db.query(
      "UPDATE usuario SET nome = ?, sobrenome = ?, numero = ? WHERE id = ?",
      [nome.trim(), sobrenome.trim(), String(numero).trim(), id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario nao encontrado." });
    }

    res.json({ message: "Usuario atualizado com sucesso." });
  } catch (error) {
    res.status(500).json({
      error: "Erro ao atualizar usuario.",
      detail: error.message,
    });
  }
});

app.delete("/usuarios/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Informe um ID valido." });
    }

    const [result] = await db.query("DELETE FROM usuario WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario nao encontrado." });
    }

    res.json({ message: "Usuario removido com sucesso." });
  } catch (error) {
    res.status(500).json({
      error: "Erro ao remover usuario.",
      detail: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`API em execucao em http://localhost:${PORT}`);
});
