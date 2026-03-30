const API = "http://localhost:3000";

const output = document.getElementById("output");
const statusDiv = document.getElementById("status");
const fieldId = document.getElementById("id");
const fieldNome = document.getElementById("nome");
const fieldSobrenome = document.getElementById("sobrenome");
const fieldNumero = document.getElementById("numero");

function setStatus(text, type) {
  statusDiv.textContent = text;
  statusDiv.className = `status status-${type}`;
}

function log(data) {
  output.textContent = JSON.stringify(data, null, 2);
}

async function request(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({
    error: "Resposta invalida da API.",
  }));

  if (!response.ok) {
    throw new Error(data.error || data.detail || "Falha na requisicao.");
  }

  return data;
}

function getFormData() {
  return {
    id: fieldId.value.trim(),
    nome: fieldNome.value.trim(),
    sobrenome: fieldSobrenome.value.trim(),
    numero: fieldNumero.value.trim(),
  };
}

function validateId(id) {
  if (!id) {
    alert("Informe um ID.");
    return false;
  }

  return true;
}

async function health() {
  try {
    const data = await request("/");
    setStatus("API online", "online");
    log(data);
  } catch (error) {
    setStatus("API offline", "offline");
    log({ error: error.message });
  }
}

async function listar() {
  try {
    const data = await request("/usuarios");
    log(data);
  } catch (error) {
    log({ error: error.message });
  }
}

async function buscar() {
  const { id } = getFormData();
  if (!validateId(id)) return;

  try {
    const data = await request(`/usuarios/${id}`);
    log(data);
  } catch (error) {
    log({ error: error.message });
  }
}

async function inserir() {
  const { nome, sobrenome, numero } = getFormData();

  if (!nome || !numero) {
    alert("Preencha pelo menos nome e numero.");
    return;
  }

  try {
    const data = await request("/usuarios", {
      method: "POST",
      body: JSON.stringify({ nome, sobrenome, numero }),
    });
    log(data);
    await listar();
  } catch (error) {
    log({ error: error.message });
  }
}

async function atualizar() {
  const { id, nome, sobrenome, numero } = getFormData();

  if (!validateId(id)) return;

  if (!nome || !numero) {
    alert("Preencha nome e numero para atualizar.");
    return;
  }

  try {
    const data = await request(`/usuarios/${id}`, {
      method: "PUT",
      body: JSON.stringify({ nome, sobrenome, numero }),
    });
    log(data);
  } catch (error) {
    log({ error: error.message });
  }
}

async function deletar() {
  const { id } = getFormData();
  if (!validateId(id)) return;

  try {
    const data = await request(`/usuarios/${id}`, {
      method: "DELETE",
    });
    log(data);
  } catch (error) {
    log({ error: error.message });
  }
}

function limpar() {
  output.textContent = "Saida limpa.";
}

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", async () => {
    const action = button.dataset.action;
    const actions = { health, listar, buscar, inserir, atualizar, deletar, limpar };

    if (actions[action]) {
      await actions[action]();
    }
  });
});

health();
