import APIHandler from "./apihandler.js";
const apiFilter = new APIHandler()
const collecBtn = document.querySelectorAll(".addToCollec");
const finishBtn = document.querySelectorAll(".addToFinish")

// const wishBtn = document.querySelectorAll(".addToWish");

collecBtn.forEach((button) => {
    button.onclick = addToList
    console.log(collecBtn)
});

finishBtn.forEach((button) => {
    button.onclick = addToList
});

async function addToList() {
    console.log("TAMAGOTCHI PAPY");
    // console.log(collecBtn.getAttribute("data-id"))
    const gameId = await document.querySelector(".addToCollec").getAttribute("data-id")
    console.log(gameId)
    const res = await apiFilter.addToCollection(gameId)
}