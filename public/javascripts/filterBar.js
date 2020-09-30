console.log("filterbar loaded");
import APIHandler from "./apihandler.js";
const apiFilter = new APIHandler();

let htmlBody = document.getElementById("toto");
const genreBox = document.querySelectorAll("input[name='favGenre']");
const platformBox = document.querySelectorAll("input[name='favConsole']");
const searchBar = document.querySelector(".input-search");

genreBox.forEach(box => box.onclick = filterHandler);
platformBox.forEach(box => box.onclick = filterHandler);
searchBar.oninput = filterHandler;




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
    platformList = arrayList.filter(input => input.checked); //array of selected input in platform
    platformList.forEach(platform => selectedPlatform.push(platform.id));

    let searchValue = searchBar.value; // value of search bar
    let strQuery = ""; // '{$and: [{"plateform" : selectedPlatform}, {"genres" : selectedGenre}]}';

    //console.log("genre: ", selectedGenre, ' length: ', selectedGenre.length);
    //console.log("platform: ", selectedPlatform, ' length: ', selectedPlatform.length);
    //console.log("title ", searchValue);
    const gamesFiltered = await apiFilter.getFilter(selectedGenre, selectedPlatform, searchValue);
    //console.log(gamesFiltered.data);
    htmlBody.innerHTML = '';
    for (let game of gamesFiltered.data) {
        //console.log(game);
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