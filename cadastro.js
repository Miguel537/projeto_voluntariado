document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCadastro");
  const mensagem = document.getElementById("mensagem");
  const cepInput = document.getElementById("cep");
  const numero = document.getElementById("numero").value;


  // Evento para buscar o endereço quando digitar o CEP
  cepInput.addEventListener("blur", async () => {
    const cep = cepInput.value.replace(/\D/g, "");
    if (cep.length === 8) {
      const endereco = await buscarEnderecoPorCEP(cep);
      if (endereco) {
        document.getElementById("rua").value = endereco.logradouro;
        document.getElementById("bairro").value = endereco.bairro;
        document.getElementById("cidade").value = endereco.localidade;
        document.getElementById("estado").value = endereco.uf;
        document.getElementById("numero").value = endereco.numero;
      } else {
        mensagem.textContent = "CEP não encontrado.";
      }
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Pega os valores
    const dados = {
      instituicao: document.getElementById("instituicao").value.trim(),
      tipoAjuda: document.getElementById("tipoAjuda").value,
      titulo: document.getElementById("titulo").value.trim(),
      descricao: document.getElementById("descricao").value.trim(),
      cep: document.getElementById("cep").value.trim(),
      rua: document.getElementById("rua").value,
      bairro: document.getElementById("bairro").value,
      cidade: document.getElementById("cidade").value,
      estado: document.getElementById("estado").value,
      numero: document.getElementById("numero").value,
      contato: document.getElementById("contato").value.trim(),
    };

    // Verifica campos obrigatórios
    for (const key in dados) {
      if (!dados[key]) {
        mensagem.textContent = "Preencha todos os campos obrigatórios.";
        return;
      }
    }

    // Recupera o array do localStorage, adiciona novo e salva de novo
    let necessidades = JSON.parse(localStorage.getItem("necessidades")) || [];
    necessidades.push(dados);
    localStorage.setItem("necessidades", JSON.stringify(necessidades));

    mensagem.textContent = "Necessidade cadastrada com sucesso!";
    form.reset();
    document.getElementById("rua").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("numero") = "";
  });
});
