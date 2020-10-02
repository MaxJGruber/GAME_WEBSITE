import APIHandler from "./apihandler.js";
const apiFilter = new APIHandler();

let htmlBody = document.getElementById("toto"); //document.querySelector("body");

let page = 2;
let sending = false;

// Detect when scrolled to bottom.
htmlBody.addEventListener("scroll", async function () {
  if (htmlBody.scrollTop + htmlBody.offsetHeight >= htmlBody.scrollHeight) {
    if (sending) return; //send only one request
    sending = true;
    const loadnextpage = await apiFilter.getGamePage(page);
    //console.log(loadnextpage);
    const games = loadnextpage.data;

    display(games);

    page++;
    console.log("loading game page ", page);
    sending = false; //request is finished
  }
});

function display(games) {
  games.forEach((game) => createGameDiv(game));
}

function createGameDiv(game) {
  let div = document.createElement("div");
  div.classList.add("game-alignment");
  div.innerHTML = `<h4 class="game-title">${game.title}</h4>
    <img src="${game.img}" alt="${game.title}-poster" class="game-poster">
    <h5 class="genre">${game.genres}</h5>
    <h5 class="platforms">${game.plateform}</h5>
    <a href="/games/collection/game/${game._id}">View details</a>
    <p class="addToCollec" data-id="${game._id}">Add to My Collection</p>`;
  htmlBody.appendChild(div);
}

/*
let getting = false;
if (this.scrollTop + this.offsetHeight >= this.scrollHeight) {
    if (!next) return;
    else {
        if (getting) return;
        getting = true;
        const res = await axios.get(next);
        const pokemons = res.data.results;
        next = res.data.next;
        displayPokemons(pokemons);
        getting = false;
    }
}*/
