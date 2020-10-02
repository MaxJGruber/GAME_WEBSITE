import APIHandler from "./apihandler.js";
const apiFilter = new APIHandler();
console.log("searchbar loaded");

const searchBar = document.querySelector(".input-search");
// searchBar.onclick = inputHandler;

const searchBtn = document.querySelector(".search-btn");
searchBtn.onclick = inputHandler;

async function inputHandler() {
  // setTimeout(, 500);
  console.log(">>>>>>>", window.location);
  let searchValue = searchBar.value;
  const result = await apiFilter.getSelectedGame(searchValue);
  console.log(result.data);
  window.location = window.location.href + `/game/${result.data}`;
  console.log(window.location);
}
