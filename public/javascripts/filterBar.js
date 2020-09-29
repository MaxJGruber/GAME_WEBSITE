console.log("filterbar loaded");
const genreBox = document.querySelectorAll(".genre-chkbox");
const platformBox = document.querySelectorAll(".platform-chkbox");

let selectedGenre = [];
let selectedPlatform = [];
let arrayList = [...genreBox];
selectedGenre = arrayList.filter(input => input.checked);
arrayList = [...platformBox];
selectedPlatform = arrayList.filter(input => input.checked);


let strQuery = '{$and: [{"plateform" : selectedPlatform}, {"genres" : selectedGenre}]}';


function generateHtmlGameCard(card) {
    `<div class="game-container">
    <h4 class="game-title">${card.title}</h4>
    <img src="${card.img}" alt="${card.title}-poster" class="game-poster">
    <h5 class="genre">${card.genres}</h5>
    <h5 class="platforms">${card.plateform}</h5>
    <a href="/games/collection/game/${card._id}">View details</a>
</div>`
}