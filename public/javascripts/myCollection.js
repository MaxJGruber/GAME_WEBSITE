import APIHandler from "./apihandler.js";
const apiFilter = new APIHandler()
const collecBtn = document.querySelectorAll(".addToCollec");
const finishBtn = document.querySelectorAll(".addToFinish")

// const wishBtn = document.querySelectorAll(".addToWish");

const collecBtnSpread = [...collecBtn]

collecBtn.forEach((button) => {
    button.onclick = addToList
    console.log("toto")
});

finishBtn.forEach((button) => {
    button.onclick = addToList
});

async function addToList(evt) {
    console.log("TAMAGOTCHI PAPY");
    // console.log(collecBtn.getAttribute("data-id"))
    console.log(evt.target, evt.currentTarget)
    const gameId = evt.currentTarget.getAttribute("data-id")
    console.log(gameId)
    const res = await apiFilter.addToCollection(gameId)
}