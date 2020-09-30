import APIHandler from "./apihandler.js";
const API = new APIHandler();
const wishBtn = document.querySelectorAll(".addToWish");
wishBtn.forEach((element) => {
  element.onclick = addToList;
});
async function addToList() {
  const gameId = document.querySelector(".addToWish").getAttribute("data-id");
  const result = await API.addToWishlist(gameId);
}

