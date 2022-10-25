window.onscroll = function () {
  myFunction();
};

function myFunction() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  let scrolled = (winScroll / height) * 100;
  document.querySelector(".indicator").style.width = scrolled + "%";
}

document.querySelector("#irTop").addEventListener("click", () =>
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
);

document.querySelector("#btnGroups").addEventListener("click", () => {
  document.querySelector("#divGroup").classList.toggle("ocultar");
});

const ocultar = (elemento) => {
  document.querySelector(elemento).classList.add("ocultar");
};

const mostrar = (elemento) => {
  document.querySelector(elemento).classList.remove("ocultar");
};

const verGrupos = () => {
  fetch("./info-grupos.json")
    .then((resposta) => resposta.json())
    .then((dados) => {
      dados.map((grupo, index) => {
        criarCards();
        preencherDadosNosCards(grupo, index);
      });
    });
};

const criarCards = () => {
  let listaDeGrupo = document.querySelector(".groupList").cloneNode(true);
  document.querySelector(".lists").append(listaDeGrupo);
};

const preencherDadosNosCards = (grupo, index) => {
  let { grupo: ogrupo, selecao1, selecao2, selecao3, selecao4 } = grupo;
  let [bandeira1, pais1] = selecao1;
  let [bandeira2, pais2] = selecao2;
  let [bandeira3, pais3] = selecao3;
  let [bandeira4, pais4] = selecao4;

  let groupTitle = document.querySelectorAll(".groupTitle");
  let selectionList = document.querySelectorAll(".selectionList");

  groupTitle[index].innerHTML = `Grupo ${ogrupo}`;
  selectionList[index].innerHTML = `
    <li><img class='groupLogo' src='./images/logos/${bandeira1}' /> ${pais1}</li>
    <li><img class='groupLogo' src='./images/logos/${bandeira2}' /> ${pais2}</li>
    <li><img class='groupLogo' src='./images/logos/${bandeira3}' /> ${pais3}</li>
    <li><img class='groupLogo' src='./images/logos/${bandeira4}' /> ${pais4}</li>`;
};

verGrupos();

/////////////////////////// GAMES ///////////////////////////
let url = "";
const listarJogos = (url) => {
  return fetch(`jogos-${url}.json`).then((resposta) => resposta.json());
};

const criarCardJogo = () => {
  let gameList = document.querySelector(".gameList").cloneNode(true);
  document.querySelector(".gamesTable").append(gameList);
  return gameList;
};

const preencherCardJogos = (lista, jogo, indice) => {
  lista[indice].querySelector(".grupo").innerHTML = `Grupo ${jogo.grupo}`; // muda nas rounds finais
  lista[indice].querySelector(
    ".data"
  ).innerHTML = `${jogo.diaSemana} ${jogo.data} às ${jogo.hora}`;
  lista[indice].querySelector(
    ".partida"
  ).innerHTML = `<img class="groupLogo" src="./images/logos/${jogo.mandante}" alt="" />
    ${jogo.partida}
    <img class="groupLogo" src="./images/logos/${jogo.visitante}" alt="" />`;
  lista[indice].querySelector(".estadio").innerHTML = `${jogo.estadio}`;
};

const renderGames = (url) => {
  mostrar("#divRounds");
  ocultar("#divFinals");
  ocultar("#divGroup");

  listarJogos(url).then((dado) => {
    document.querySelector(".round").innerHTML = `${dado[0].round}ª round`;
    dado.map((jogo, indice) => {
      preencherCardJogos(cardsrounds, jogo, indice);
    });
  });
};

let numeroDeJogos = 16;
let cardsrounds = [];

for (let i = 0; i < numeroDeJogos; i++) {
  cardsrounds[i] = criarCardJogo();
}
// console.log(cardsrounds)

renderGames(1);

///// ROUNDS ////

////////// FINALS /////////////
const criarCard = (elemento, local) => {
  let card = document.querySelector(elemento).cloneNode(true);
  document.querySelector(local).append(card);
  return card;
};

const preencherCardJogosFinais = (lista, jogo, indice) => {
  lista[indice].querySelector(".fase").innerHTML = `${jogo.round}`; // muda nas rounds finais
  lista[indice].querySelector(
    ".data"
  ).innerHTML = `${jogo.diaSemana} ${jogo.data} às ${jogo.hora}`;
  lista[indice].querySelector(
    ".partida"
  ).innerHTML = `<img class="groupLogo" src="./images/logos/${jogo.mandante}" alt="" />
    ${jogo.partida}
    <img class="groupLogo" src="./images/logos/${jogo.visitante}" alt="" />`;
  lista[indice].querySelector(".estadio").innerHTML = `${jogo.estadio}`;
};

let numeroDeJogosFinais = 16;
let cardsJogosFinais = [];
for (let i = 0; i < numeroDeJogosFinais; i++) {
  cardsJogosFinais[i] = criarCard(
    ".gameFinals",
    ".gamesTableFinals"
  );
}

const renderFinals = (url) => {
  mostrar("#divFinals");
  ocultar("#divRounds");
  ocultar("#divGroup");

  listarJogos(url).then((dado) => {
    dado.map((jogo, indice) => {
      //preencherCardJogos(cardsrounds, jogo, indice)
      preencherCardJogosFinais(cardsJogosFinais, jogo, indice);
    });
  });
};

