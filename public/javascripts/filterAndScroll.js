console.log("filter and scroll loaded");
import APIHandler from "./apihandler.js";
const apiFilter = new APIHandler();

let htmlBody = document.getElementById("games-view");
const genreBox = document.querySelectorAll("input[name='favGenre']");
const platformBox = document.querySelectorAll("input[name='favConsole']");
const searchBar = document.querySelector(".input-search");

genreBox.forEach(box => box.onclick = clickHandler);
platformBox.forEach(box => box.onclick = clickHandler);
searchBar.oninput = inputHandler;

let page = 2;
let typing;

// Detect when scrolled to bottom.
htmlBody.addEventListener('scroll', async function() {
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
    htmlBody.innerHTML = '';
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
    genreList = arrayList.filter(input => input.checked); //array of selected input in genre
    genreList.forEach(genre => selectedGenre.push(genre.id));

    arrayList = [...platformBox];
    console.log(arrayList);
    platformList = arrayList.filter(input => input.checked); //array of selected input in platform
    platformList.forEach(platform => selectedPlatform.push(platform.id));

    let searchValue = searchBar.value; // value of search bar
    console.log("loading game page ", page);
    const gamesFiltered = await apiFilter.getFilterAndPAge(page, selectedGenre, selectedPlatform, searchValue);
    page++;
    console.log(gamesFiltered.data);

    for (let game of gamesFiltered.data) {
        createGameDiv(game);
    }
}

function createGameDiv(game) {
    let div = document.createElement("div");
    div.classList.add("game-container");
    div.innerHTML = `<h4 class="game-title">${game.title}</h4>
    <img src="${game.img}" alt="${game.title}-poster" class="game-poster">
    <h5 class="genre">${game.genres}</h5>
    <h5 class="platforms">${game.plateform}</h5>
    <a href="/games/collection/game/${game._id}">View details</a>
    <p class="addToCollec" data-id="${game._id}">Add to My Collection</p>`
    htmlBody.appendChild(div);
}