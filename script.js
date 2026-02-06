// 1) Pegando elementos da tela (DOM)
const titulo = document.getElementById("titulo");
const btnTema = document.getElementById("btnTema");
const btnMudarTitulo = document.getElementById("btnMudarTitulo");

const inputTarefa = document.getElementById("inputTarefa");
const btnAdd = document.getElementById("btnAdd");
const lista = document.getElementById("lista");

// 2) Alterar visual: tema escuro (classe CSS)
btnTema.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// 3) Alterar conteúdo: mudar título
btnMudarTitulo.addEventListener("click", () => {
    titulo.textContent = "Título alterado pelo JavaScript ✅";
});

// 4) Criar elementos: adicionar itens na lista
btnAdd.addEventListener("click", () => {
    const texto = inputTarefa.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = texto;

    // Botão de remover
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.classList.add("btn-remover");

    btnRemover.addEventListener("click", () => {
        li.remove();
    });

    li.appendChild(btnRemover);
    lista.appendChild(li);

    inputTarefa.value = "";
    inputTarefa.focus();
});

// Quando clicar no botão
btnAdd.addEventListener("click", adicionarTarefa);

// Quando apertar Enter no input
inputTarefa.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    adicionarTarefa();
  }
});

// Função reutilizável
function adicionarTarefa() {
  const texto = inputTarefa.value.trim();

  if (texto === "") {
    alert("Digite uma tarefa!");
    return;
  }

  const li = document.createElement("li");
  li.textContent = texto;

  const btnRemover = document.createElement("button");
  btnRemover.textContent = "Remover";
  btnRemover.classList.add("btn-remover");

  btnRemover.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(btnRemover);
  lista.appendChild(li);

  inputTarefa.value = "";
  inputTarefa.focus();
}
