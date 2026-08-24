const herois = [
  {
    nome: "Homem-Aranha",
    universo: "Marvel",
    poder: "Sentido-aranha",
    ano: 1962,
  },
  {
    nome: "Mulher-Maravilha",
    universo: "DC",
    poder: "Força sobre-humana",
    ano: 1941,
  },
  {
    nome: "Homem de Ferro",
    universo: "Marvel",
    poder: "Armadura tecnológica",
    ano: 1963,
  },
  { nome: "Batman", universo: "DC", poder: "Inteligência", ano: 1939 },
  {
    nome: "Capitã Marvel",
    universo: "Marvel",
    poder: "Absorção de energia",
    ano: 1968,
  },
  { nome: "Superman", universo: "DC", poder: "Voo e superforça", ano: 1938 },
  {
    nome: "Pantera Negra",
    universo: "Marvel",
    poder: "Agilidade felina",
    ano: 1966,
  },
  { nome: "Flash", universo: "DC", poder: "Supervelocidade", ano: 1940 },
];

const campoBusca = document.getElementById("campoBusca");
const botaoOrdenar = document.getElementById("botaoOrdenar");
const corpoTabela = document.getElementById("corpoTabela");
const mensagemVazia = document.getElementById("mensagemVazia");

let ordem = null;

function mostrarHerois(lista) {
  // Primeiro esvazia a tabela, para não empilhar linhas repetidas.
  corpoTabela.innerHTML = "";

  // Para cada herói da lista, cria uma linha com quatro células.
  lista.forEach(function (heroi) {
    const linha = document.createElement("tr");

    [heroi.nome, heroi.universo, heroi.poder, heroi.ano].forEach(
      function (valor) {
        const celula = document.createElement("td");
        celula.textContent = valor;
        linha.appendChild(celula);
      },
    );

    corpoTabela.appendChild(linha);
  });

  // Se a lista veio vazia, mostra a mensagem; senão, esconde.
  if (lista.length === 0) {
    mensagemVazia.style.display = "block";
  } else {
    mensagemVazia.style.display = "none";
  }
}

function atualizarTabela() {
  const termo = campoBusca.value.trim().toLowerCase();

  // filter() devolve uma lista NOVA só com quem passa no teste:
  // heróis cujo nome, universo ou poder contem o texto digitado.
  const visiveis = herois.filter(function (heroi) {
    return (
      heroi.nome.toLowerCase().includes(termo) ||
      heroi.universo.toLowerCase().includes(termo) ||
      heroi.poder.toLowerCase().includes(termo)
    );
  });

  // sort() reordena a lista em que é usado. Como "visiveis" já é uma
  // cópia, o array original "herois" nunca é bagunçado.
  if (ordem === "asc") {
    visiveis.sort(function (a, b) {
      return a.ano - b.ano;
    });
  } else if (ordem === "desc") {
    visiveis.sort(function (a, b) {
      return b.ano - a.ano;
    });
  }

  mostrarHerois(visiveis);
}

campoBusca.addEventListener("input", atualizarTabela);

botaoOrdenar.addEventListener("click", function () {
  ordem = ordem === "asc" ? "desc" : "asc";

  botaoOrdenar.textContent =
    ordem === "asc" ? "Ordenar por ano ↓" : "Ordenar por ano ↑";

  atualizarTabela();
});

// Troca de cor com o cursor em cima. Como o estilo do botão é inline,
// o :hover não funciona: fazemos por evento.
botaoOrdenar.addEventListener("mouseenter", function () {
  botaoOrdenar.style.background = "#c1121f";
  botaoOrdenar.style.borderColor = "#c1121f";
});
botaoOrdenar.addEventListener("mouseleave", function () {
  botaoOrdenar.style.background = "#14213d";
  botaoOrdenar.style.borderColor = "#14213d";
});

atualizarTabela();
