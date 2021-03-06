import APIHandler from "./apihandler.js";
const apiFilter = new APIHandler();

// BUTTONS TO ADD

const collecBtn = document.querySelectorAll(".addToCollec");
const finishBtn = document.querySelectorAll(".addToFinish");
const wishBtn = document.querySelectorAll(".addToWish");

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

// BUTTONS TO DELETE

const deleteWishBtn = document.querySelectorAll(".del-wish");
const deleteFinishedBtn = document.querySelectorAll(".del-finished");
const deleteOwnedBtn = document.querySelectorAll(".del-owned");

console.log(deleteWishBtn);

deleteWishBtn.forEach((button) => {
  button.onclick = deleteFromWishlistList;
});

deleteFinishedBtn.forEach((button) => {
  button.onclick = deleteFromFinishedList;
});

deleteOwnedBtn.forEach((element) => {
  element.onclick = deleteFromOwnedList;
});

async function deleteFromWishlistList(evt) {
  // console.log("toto");
  const gameId = evt.currentTarget.getAttribute("data-id");
  const res = await apiFilter.deleteFromWishlist(gameId);
  window.location = window.location;
}

async function deleteFromFinishedList(evt) {
  const gameId = evt.currentTarget.getAttribute("data-id");
  const res = await apiFilter.deleteFromFinished(gameId);
  window.location = window.location;
}

async function deleteFromOwnedList(evt) {
  const gameId = evt.currentTarget.getAttribute("data-id");
  const res = await apiFilter.deleteFromOwned(gameId);
  window.location = window.location;
}
