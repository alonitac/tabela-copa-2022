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
const gameList = (url) => {
  return fetch(`games-${url}.json`).then((response) => response.json());
};

const createGameCard = () => {
  let gameList = document.querySelector(".gameList").cloneNode(true);
  document.querySelector(".gamesTable").append(gameList);
  return gameList;
};

const createGameCard_ = (list, game, index) => {
  list[index].querySelector(".group").innerHTML = `Group ${game.group}`; // muda nas rounds finais
  list[index].querySelector(
    ".data"
  ).innerHTML = `${game.dayweek} ${game.data} at ${game.hour}`;
  list[index].querySelector(
    ".match"
  ).innerHTML = `<img class="groupLogo" src="./images/logos/${game.host}" alt="" />
    ${game.match}
    <img class="groupLogo" src="./images/logos/${game.visitor}" alt="" />`;
  list[index].querySelector(".stadium").innerHTML = `${game.stadium}`;
};

const renderGames = (url) => {
  showInfo("#divRounds");
  hide("#divFinals");
  hide("#divGroup");

  gameList(url).then((data) => {
    document.querySelector(".round").innerHTML = `${data[0].round}ª round`;
    data.map((game, index) => {
      createGameCard_(cardsrounds, game, index);
    });
  });
};

let numberOfGames = 16;
let cardsrounds = [];

for (let i = 0; i < numberOfGames; i++) {
  cardsrounds[i] = createGameCard();
}

renderGames(1);

///// ROUNDS ////

////////// FINALS /////////////
const createCard = (element, local) => {
  let card = document.querySelector(element).cloneNode(true);
  document.querySelector(local).append(card);
  return card;
};

const fillCardGamesFinals = (list, game, index) => {
  list[index].querySelector(".fase").innerHTML = `${game.round}`; // muda nas rounds finais
  list[index].querySelector(
    ".data"
  ).innerHTML = `${game.dayweek} ${game.data} at ${game.hour}`;
  list[index].querySelector(
    ".match"
  ).innerHTML = `<img class="groupLogo" src="./images/logos/${game.host}" alt="" />
    ${game.match}
    <img class="groupLogo" src="./images/logos/${game.visitor}" alt="" />`;
  list[index].querySelector(".stadium").innerHTML = `${game.stadium}`;
};

let numberOfGamesFinals = 16;
let cardsGamesFinals = [];
for (let i = 0; i < numberOfGamesFinals; i++) {
  cardsGamesFinals[i] = createCard(
    ".gameFinals",
    ".gamesTableFinals"
  );
}

const renderFinals = (url) => {
  showInfo("#divFinals");
  hide("#divRounds");
  hide("#divGroup");

  gameList(url).then((data) => {
    data.map((game, index) => {
      fillCardGamesFinals(cardsGamesFinals, game, index);
    });
  });
};

