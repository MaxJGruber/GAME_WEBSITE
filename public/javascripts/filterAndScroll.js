console.log("filter and scroll loaded");
import APIHandler from "./apihandler.js";
const apiFilter = new APIHandler();

let htmlBody = document.getElementById("games-view");
const genreBox = document.querySelectorAll("input[name='favGenre']");
const platformBox = document.querySelectorAll("input[name='favConsole']");
const searchBar = document.querySelector(".input-search");
const platformChkbox = document.querySelector(".platform-chkbox");
const genreChkbox = document.querySelector(".genre-chkbox");
const platformDiv = document.querySelector(".platform-div");
const genreDiv = document.querySelector(".genre-div");

platformChkbox.onclick = platformHandler;
genreChkbox.onclick = genreHandler;

function platformHandler() {
  platformDiv.classList.toggle("hidden");
}

function genreHandler() {
  genreDiv.classList.toggle("hidden");
}

platformDiv.onclick = (e) => e.stopPropagation();
genreDiv.onclick = (e) => e.stopPropagation();

genreBox.forEach((box) => (box.onclick = clickHandler));
platformBox.forEach((box) => (box.onclick = clickHandler));
searchBar.oninput = inputHandler;

// -----------------------
let collecBtn = document.querySelectorAll(".addToCollec");
let finishBtn = document.querySelectorAll(".addToFinish");
let wishBtn = document.querySelectorAll(".addToWish");

// console.log("My collection loaded");

collecBtn.forEach((button) => {
  button.onclick = addToCollectionList;
});

finishBtn.forEach((button) => {
  button.onclick = addToFinishList;
});

wishBtn.forEach((element) => {
  element.onclick = addToWish;
});

async function addToWish(evt) {
  evt.currentTarget.style["color"] = "green";
  const gameId = evt.currentTarget.getAttribute("data-id");
  const result = await apiFilter.addToWishlist(gameId);
}

async function addToCollectionList(evt) {
  evt.currentTarget.style["color"] = "green";
  console.log("TAMAGOTCHI PAPY");
  // console.log(collecBtn.getAttribute("data-id"))
  // console.log(evt.target, evt.currentTarget)
  const gameId = evt.currentTarget.getAttribute("data-id");
  console.log(gameId);
  const res = await apiFilter.addToCollection(gameId);
}

async function addToFinishList(evt) {
  evt.currentTarget.style["color"] = "green";
  // console.log("TAMAGOTCHI PAPY");
  // console.log(collecBtn.getAttribute("data-id"))
  // console.log(evt.target, evt.currentTarget)
  const gameId = evt.currentTarget.getAttribute("data-id");
  // console.log(gameId)
  const res = await apiFilter.addToFinish(gameId);
}

let page = 2;
let typing;

// Detect when scrolled to bottom.
htmlBody.addEventListener("scroll", async function () {
  //console.log(htmlBody.scrollTop + htmlBody.clientHeight, htmlBody.scrollHeight)
  if (htmlBody.scrollTop + htmlBody.clientHeight >= htmlBody.scrollHeight - 1) {
    filterHandler();
  }
});

function inputHandler() {
  console.log("titi");
  clearTimeout(typing);
  typing = setTimeout(() => clickHandler(), 500);
}

function clickHandler() {
  page = 1; //reset index of page
  htmlBody.innerHTML = "";
  filterHandler();
}

async function filterHandler() {
  console.log("filterhandler");
  //get dom value
  let selectedGenre = [];
  let selectedPlatform = [];
  let platformList = [];
  let genreList = [];

  let arrayList = [...genreBox];
  genreList = arrayList.filter((input) => input.checked); //array of selected input in genre
  genreList.forEach((genre) => selectedGenre.push(genre.id));

  arrayList = [...platformBox];
  console.log(arrayList);
  platformList = arrayList.filter((input) => input.checked); //array of selected input in platform
  platformList.forEach((platform) => selectedPlatform.push(platform.id));

  let searchValue = searchBar.value; // value of search bar
  console.log("loading game page ", page);
  const gamesFiltered = await apiFilter.getFilterAndPAge(
    page,
    selectedGenre,
    selectedPlatform,
    searchValue
  );
  page++;
  console.log(gamesFiltered.data);

  for (let game of gamesFiltered.data) {
    createGameDiv(game);
  }
  collecBtn = document.querySelectorAll(".addToCollec");
  finishBtn = document.querySelectorAll(".addToFinish");
  wishBtn = document.querySelectorAll(".addToWish");

  collecBtn.forEach((button) => {
    button.onclick = addToCollectionList;
  });

  finishBtn.forEach((button) => {
    button.onclick = addToFinishList;
  });

  wishBtn.forEach((element) => {
    element.onclick = addToWish;
  });
}

function createGameDiv(game) {
  let div = document.createElement("div");
  div.classList.add("game-alignment");
  div.innerHTML = `<div class="game-container">
    <a href="/games/collection/game/${game._id}" class="game-link">
        <h4 class="game-title">${game.title}</h4>
        <img src="${game.img}" alt="${
    game.title
  }-poster" class="game-poster">        
        <h5 class="genre">
            ${game.genres.join(" / ")}
        </h5>
        <h5 class="platforms">
            ${game.plateform.join(" / ")}
        </h5>
        <div class="add-btn">
            <a class="addToCollec" data-id="${
              game._id
            }"><i class="far fa-plus-square"></i>  <span class="add">Add to Collection</span></a>
        </div>
        <div class="add-btn">
            <a class="addToFinish" data-id="${
              game._id
            }"><i class="far fa-check-square"></i>  <span class="add">Add to Finished Games</span></a>
        </div>
        </a></div>`;
  htmlBody.appendChild(div);

  // `<h4 class="game-title">${game.title}</h4>
  // <img src="${game.img}" alt="${game.title}-poster" class="game-poster">
  // <h5 class="genre">${game.genres}</h5>
  // <h5 class="platforms">${game.plateform}</h5>
  // <a href="/games/collection/game/${game._id}">View details</a>
  // <p class="addToCollec" data-id="${game._id}">Add to My Collection</p>`
}
