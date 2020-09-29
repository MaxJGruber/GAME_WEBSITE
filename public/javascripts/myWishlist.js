import Axios from "axios";
import APIHandler from "./apihandler.js";
const API = new APIHandler();

const wishBtn = document.querySelectorAll(".addToWish");
wishBtn.forEach((element) => {
  element.onclick = addToWishlist;
});

async function addToWishlist() {
  const gameId = wishBtn.id;
  console.log(gameId);
  const result = await API.getSelectedGame(gameId);
  console.log(result);
}
