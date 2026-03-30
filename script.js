const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const btnTema = document.getElementById("btnTema");
const btnMudarTitulo = document.getElementById("btnMudarTitulo");
const inputTarefa = document.getElementById("inputTarefa");
const btnAdd = document.getElementById("btnAdd");
const lista = document.getElementById("lista");
const btnConsumirApi = document.getElementById("consumo-da-api");
const apiResultado = document.getElementById("apiResultado");
const contadorTarefas = document.getElementById("contadorTarefas");

const STORAGE_KEY = "aula-js-css-html:tarefas";
const THEME_KEY = "aula-js-css-html:tema";
const API_URL = "http://localhost:3000/";

let tarefas = carregarTarefas();

function carregarTarefas() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Falha ao carregar tarefas:", error);
    return [];
  }
}

function salvarTarefas() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
}

function atualizarContador() {
  const total = tarefas.length;
  contadorTarefas.textContent = `${total} ${total === 1 ? "tarefa cadastrada" : "tarefas cadastradas"}`;
}

function renderizarTarefas() {
  lista.innerHTML = "";

  if (tarefas.length === 0) {
    const emptyState = document.createElement("li");
    emptyState.className = "task-empty";
    emptyState.textContent = "Nenhuma tarefa adicionada ainda.";
    lista.appendChild(emptyState);
    atualizarContador();
    return;
  }

  tarefas.forEach((texto, index) => {
    const li = document.createElement("li");
    li.className = "task-item";

    const span = document.createElement("span");
    span.textContent = texto;

    const btnRemover = document.createElement("button");
    btnRemover.type = "button";
    btnRemover.textContent = "Remover";
    btnRemover.className = "btn-remover";
    btnRemover.addEventListener("click", () => {
      tarefas.splice(index, 1);
      salvarTarefas();
      renderizarTarefas();
    });

    li.append(span, btnRemover);
    lista.appendChild(li);
  });

  atualizarContador();
}

function adicionarTarefa() {
  const texto = inputTarefa.value.trim();

  if (!texto) {
    alert("Digite uma tarefa antes de adicionar.");
    return;
  }

  tarefas.push(texto);
  salvarTarefas();
  renderizarTarefas();
  inputTarefa.value = "";
  inputTarefa.focus();
}

async function consumirApi() {
  apiResultado.textContent = "Consultando API...";

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    apiResultado.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    apiResultado.textContent = JSON.stringify(
      {
        error: "Nao foi possivel acessar a API.",
        detail: "Verifique se o servidor em http://localhost:3000 esta em execucao.",
      },
      null,
      2
    );
  }
}

function alternarTema() {
  document.body.classList.toggle("dark");
  const temaAtual = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem(THEME_KEY, temaAtual);
}

function restaurarTema() {
  const temaSalvo = localStorage.getItem(THEME_KEY);

  if (temaSalvo === "dark") {
    document.body.classList.add("dark");
  }
}

btnTema.addEventListener("click", alternarTema);

btnMudarTitulo.addEventListener("click", () => {
  titulo.textContent = "Projeto de Aula com Interface Polida";
  descricao.textContent =
    "A pagina principal agora demonstra interacao com o DOM, armazenamento local e um caminho claro para o CRUD completo.";
});

btnAdd.addEventListener("click", adicionarTarefa);

inputTarefa.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    adicionarTarefa();
  }
});

btnConsumirApi.addEventListener("click", consumirApi);

restaurarTema();
renderizarTarefas();
