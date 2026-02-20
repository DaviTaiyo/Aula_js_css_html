const API = "http://localhost:3000";

const output = document.getElementById("output");
const statusDiv = document.getElementById("status");

function log(data) {
    output.textContent =  JSON.stringify(data, null, 2);
}

async function health() {
    try {
        const res = await fetch(`${API}/`);
        const data = await res.json();
        statusDiv.textContent = "API ONLINE";
        statusDiv.style.backgroundColor = "green";
        log(data);
    } catch (err) {
        statusDiv.textContent = "API OffLINE";
        statusDiv.style.backgroundColor = "red";
        log(err);
    }
}

async function listar() {
    const res = await fetch(`${API}/usuarios`);
    const data = await res.json();
    log(data);    
}

async function buscar() {
    const id = document.getElementById("id").value;
    if (!id) return alert("Informe um ID");

    const res = await fetch(`${API}/usuarios/${id}`);
    const data = await res.json();
    log(data);
}
