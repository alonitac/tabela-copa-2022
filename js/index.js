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
  document.querySelector("#divGroup").classList.toggle("hide");
});

const hide = (element) => {
  document.querySelector(element).classList.add("hide");
};

const showInfo = (element) => {
  document.querySelector(element).classList.remove("hide");
};

const showGroups = () => {
  fetch("./info-groups.json")
    .then((response) => response.json())
    .then((data) => {
      data.map((group, index) => {
        createCards();
        fillDataCard(group, index);
      });
    });
};

const createCards = () => {
  let groupList = document.querySelector(".groupList").cloneNode(true);
  document.querySelector(".lists").append(groupList);
};

const fillDataCard = (group, index) => {
  let { group: _group, selection1, selection2, selection3, selection4 } = group;
  let [logo1, pair1] = selection1;
  let [logo2, pair2] = selection2;
  let [logo3, pair3] = selection3;
  let [logo4, pair4] = selection4;

  let groupTitle = document.querySelectorAll(".groupTitle");
  let selectionList = document.querySelectorAll(".selectionList");

  groupTitle[index].innerHTML = `Group ${_group}`;
  selectionList[index].innerHTML = `
    <li><img class='groupLogo' src='./images/logos/${logo1}' /> ${pair1}</li>
    <li><img class='groupLogo' src='./images/logos/${logo2}' /> ${pair2}</li>
    <li><img class='groupLogo' src='./images/logos/${logo3}' /> ${pair3}</li>
    <li><img class='groupLogo' src='./images/logos/${logo4}' /> ${pair4}</li>`;
};

showGroups();

/////////////////////////// GAMES ///////////////////////////
let url = "";
const listarJogos = (url) => {
  return fetch(`jogos-${url}.json`).then((response) => response.json());
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
  showInfo("#divRounds");
  hide("#divFinals");
  hide("#divGroup");

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
  showInfo("#divFinals");
  hide("#divRounds");
  hide("#divGroup");

  listarJogos(url).then((dado) => {
    dado.map((jogo, indice) => {
      //preencherCardJogos(cardsrounds, jogo, indice)
      preencherCardJogosFinais(cardsJogosFinais, jogo, indice);
    });
  });
};

