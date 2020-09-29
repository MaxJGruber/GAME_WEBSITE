import APIHandler from "./apihandler.js";
const apiFilter = new APIHandler()
const collecBtn = document.querySelectorAll(".addToCollec");

// const wishBtn = document.querySelectorAll(".addToWish");
// const finishBtn = document.querySelectorAll(".addToFinish")

collecBtn.forEach((button) => {
    button.onclick = addToList
})

async function addToList() {
    console.log("TAMAGOTCHI PAPY");
    console.log(document.querySelector(".addToCollec").getAttribute("data-id"))
    const gameId = document.querySelector(".addToCollec").getAttribute("data-id")
    const res = await apiFilter.addToCollection(gameId)
}