console.log("filterbar loaded");
import APIHandler from "./apihandler.js";
const apiFilter = new APIHandler();

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

    console.log("genre: ", selectedGenre, ' length: ', selectedGenre.length);
    console.log("platform: ", selectedPlatform, ' length: ', selectedPlatform.length);
    console.log("title ", searchValue);

    //construct the correct query
    //for genre
    let strQueryGenre;
    if (selectedGenre.length >= 2) {
        strQueryGenre = `{ genres : {$in: ${selectedGenre}}}`
    } else if (selectedGenre[0]) {
        strQueryGenre = `{genres : ${selectedGenre}}`
    } else {
        strQueryGenre = "";
    }

    console.log("strQueryGenre ", strQueryGenre);
    //for platform
    let strQueryPlatform;
    if (selectedPlatform.length >= 2) {
        strQueryPlatform = `{ platform : {$in: ${selectedPlatform}}}`
    } else if (selectedPlatform[0]) {
        strQueryPlatform = `{platform : ${selectedPlatform}}`
    } else {
        strQueryPlatform = "";
    }

    console.log("strQueryPlatform ", strQueryPlatform);
    //for title
    let strQueryTitle = searchValue ? `{title : {$regex: ".*${searchValue}.*"}}` : "";

    //there is titleinput
    if (strQueryTitle) {
        // there is genre and platform
        if (selectedGenre.length > 0 && selectedPlatform.length > 0) {
            strQuery = `{$and: [${strQueryGenre}, ${strQueryPlatform}, ${strQueryTitle}]}`;
        }
        //there is no genre
        if (selectedGenre.length == 0) {
            strQuery = `{$and: [${strQueryPlatform}, ${strQueryTitle}]}`;
        }
        //there is no platform
        if (selectedPlatform.length == 0) {
            strQuery = `{$and: [${strQueryGenre}, ${strQueryTitle}]}`;
        }
        //there is no genre nor platform (only title)
        if (selectedGenre.length == 0 && selectedPlatform.length == 0) {
            strQuery = `{${strQueryTitle}}`;
        }
        //there is no title
    } else {
        // there is genre and platform
        if (selectedGenre.length > 0 && selectedPlatform.length > 0) {
            strQuery = `{$and: [${strQueryGenre}, ${strQueryPlatform}]}`;
        }
        //there is no genre
        if (selectedGenre.length == 0) {
            strQuery = `{${strQueryPlatform}}`;
        }
        //there is no platform
        if (selectedPlatform.length == 0) {
            strQuery = `{${strQueryGenre}}`;
        }
        //there is no genre nor platform nor title
        if (selectedGenre.length == 0 && selectedPlatform.length == 0) {
            strQuery = ``;
        }
    }

    console.log(strQuery);
    const gamesFiltered = await apiFilter.getFilter(strQuery);
    console.log(gamesFiltered.data);
    //gamesFiltered.forEach(game => generateHtmlGameCard(game));
}



function generateHtmlGameCard(card) {
    return `<div class="game-container">
    <h4 class="game-title">${card.title}</h4>
    <img src="${card.img}" alt="${card.title}-poster" class="game-poster">
    <h5 class="genre">${card.genres}</h5>
    <h5 class="platforms">${card.plateform}</h5>
    <a href="/games/collection/game/${card._id}">View details</a>
</div>`
}