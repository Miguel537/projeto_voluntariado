function exibirNecessidades(lista) {
  const container = document.getElementById("listaNecessidades");
  container.innerHTML = "";

  if (lista.length === 0) {
    container.innerHTML = "<p>Nenhuma necessidade encontrada.</p>";
    return;
  }

  lista.forEach(necessidade => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
                <h3>${necessidade.titulo}</h3>
                <p><strong>Instituição:</strong> ${necessidade.instituicao}</p>
                <p><strong>Tipo de Ajuda:</strong> ${necessidade.tipoAjuda}</p>
                <button onclick="mostrarDetalhes(${JSON.stringify(necessidade).replace(/"/g, '&quot;')})">Ver detalhes</button>
                 `;

    container.appendChild(card);
  });
}

function filtrar() {
  const busca = document.getElementById("busca").value.toLowerCase();
  const filtroTipo = document.getElementById("filtroTipoAjuda").value;

  const lista = JSON.parse(localStorage.getItem("necessidades") || "[]");

  const filtrado = lista.filter(n => {
    const condBusca = n.titulo.toLowerCase().includes(busca) || n.descricao.toLowerCase().includes(busca);
    const condTipo = filtroTipo === "" || n.tipoAjuda === filtroTipo;
    return condBusca && condTipo;
  });

  exibirNecessidades(filtrado);
}

document.getElementById("busca").addEventListener("input", filtrar);
document.getElementById("filtroTipoAjuda").addEventListener("change", filtrar);

// Mostrar tudo ao carregar
filtrar();
