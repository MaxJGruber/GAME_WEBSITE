const genreBox = document.querySelectorAll(".genre-chkbox");
const platformBox = document.querySelectorAll(".platform-chkbox");

let selectedGenre = [];
let selectedPlatform = [];
let arrayList = [...genreBox];
selectedGenre = arrayList.filter(input => input.checked);
arrayList = [...platformBox];
selectedPlatform = arrayList.filter(input => input.checked);


let strQuery = '{$and: [{"plateform" : selectedPlatform}, {"genres" : selectedGenre}]}';