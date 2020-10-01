export function navbarCollapse() {
  var navBar = document.getElementById("myTopnav");
  if (navBar.className === "topnav") {
    navBar.className.add("responsive");
  } else {
    navBar.className.remove("responsive");
  }
}

const collapse = document.querySelector(".icon");
collapse.onclick = navbarCollapse;
