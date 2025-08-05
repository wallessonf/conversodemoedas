async function obterCotacoes() {
  const url = "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL";

  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    return {
      USD: parseFloat(dados.USDBRL.bid),
      EUR: parseFloat(dados.EURBRL.bid),
      GBP: parseFloat(dados.GBPBRL.bid),
      BRL: 1.0
    };
  } catch (erro) {
    console.error("Erro ao obter cotações:", erro);
    return null;
  }
}


async function converter(valor, deMoeda, paraMoeda) {
  const cotacoes = await obterCotacoes();
  if (!cotacoes) return "Erro ao obter cotações";

  const valorEmReais = valor * cotacoes[deMoeda];

  const resultado = valorEmReais / cotacoes[paraMoeda];

  return resultado;
}

document
  .getElementById("formulario")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const valor = parseFloat(document.getElementById("valor").value);
    const deMoeda = document.getElementById("deMoeda").value.toUpperCase();
    const paraMoeda = document.getElementById("paraMoeda").value.toUpperCase();
    const resultadoTexto = document.getElementById("resultado");

    if (!valor || valor <= 0) {
      resultadoTexto.innerText = "Digite um valor válido!";
      return;
    }

    const resultado = await converter(valor, deMoeda, paraMoeda);

    const simbolos = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      BRL: "R$",
    };

    resultadoTexto.innerText = `Resultado: ${
      simbolos[paraMoeda]
    } ${resultado.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  });
