//One genre AND 2 platforms AND NO title
// {$and: [{genres : "Action"}, {plateform : {$in : ["Xbox 360", "PC"]}}]}

//One genre AND 2 platforms AND title
// {$and: [{genres : "Action"}, {plateform : {$in : ["Xbox 360", "PC"]}}, {title : {$regex: ".*ort.*"}}]}

//One genre AND One platform AND NO title
// {$and: [{genres : "Action"}, {plateform : "Xbox 360"}]}

//One genre AND One platform AND title
// {$and: [{genres : "Action"}, {plateform : "Xbox 360"}, {title : {$regex: ".*ort.*"}}]}

//One genre AND NO platforms AND NO title
//{genres : "Shooter"}

//One genre AND NO platforms AND title
//{$and: [{genres : "Shooter"}, {title : {$regex: ".*ort.*"}}]}

//NO genre and One platform AND NO title
//{plateforms : "Xbox 360"}

//NO genre and One platform AND title
//{$and: [{plateforms : "Xbox 360"}, {title : {$regex: ".*ort.*"}}]}

//Two genres and NO platforms AND NO title
//{genres : {$in: ["Xbox 360", "PC"]}}

//Two genres and NO platforms AND title
//{$and: [{genres : {$in: ["Xbox 360", "PC"]}}, {title : {$regex: ".*ort.*"}}]}

//NO genres AND Two platforms AND NO title
//{plateforms : {$in: ["Action", "Shooter"]}}

//NO genres AND Two platforms AND title
//{$and: [{plateforms : {$in: ["Action", "Shooter"]}}, {title : {$regex: ".*ort.*"}}]}

//NO FILTER
//

//Does title contain???
// {title : {$regex: ".*ort.*"}}

//Two genres AND two platforms AND NO title
//{$and: [{plateforms : {$in: ["Action", "Shooter"]}}, {genres : {$in: ["Xbox 360", "PC"]}}]}

//Two genres AND two platforms AND title
//{$and: [{plateforms : {$in: ["Action", "Shooter"]}}, {genres : {$in: ["Xbox 360", "PC"]}}, {title : {$regex: ".*ort.*"}}]}



//construct the correct query
//for genre
// let strQueryGenre;
// if (selectedGenre.length >= 2) {
//     strQueryGenre = ` genres : {$in: ${arrayToString(selectedGenre)}}`;
// } else if (selectedGenre.length == 1) {
//     strQueryGenre = `genres : "${selectedGenre}"`;
// } else {
//     strQueryGenre = "";
// }

// console.log("strQueryGenre ", strQueryGenre);
// //for platform
// let strQueryPlatform;
// if (selectedPlatform.length >= 2) {
//     strQueryPlatform = ` platform : {$in: ${arrayToString(selectedPlatform)}}`;
// } else if (selectedPlatform.length == 1) {
//     strQueryPlatform = `platform : "${selectedPlatform}"`;
// } else {
//     strQueryPlatform = "";
// }

// console.log("strQueryPlatform ", strQueryPlatform);
// //for title
// let strQueryTitle = searchValue ? `{title : {$regex: ".*${searchValue}.*"}}` : "";

// //there is titleinput
// if (strQueryTitle) {
//     // there is genre and platform
//     if (selectedGenre.length > 0 && selectedPlatform.length > 0) {
//         strQuery = `{$and: [${strQueryGenre}, ${strQueryPlatform}, ${strQueryTitle}]}`;
//     }
//     //there is no genre
//     if (selectedGenre.length == 0) {
//         strQuery = `{$and: [${strQueryPlatform}, ${strQueryTitle}]}`;
//     }
//     //there is no platform
//     if (selectedPlatform.length == 0) {
//         strQuery = `{$and: [${strQueryGenre}, ${strQueryTitle}]}`;
//     }
//     //there is no genre nor platform (only title)
//     if (selectedGenre.length == 0 && selectedPlatform.length == 0) {
//         strQuery = `{${strQueryTitle}}`;
//     }
//     //there is no title
// } else {
//     // there is genre and platform
//     if (selectedGenre.length > 0 && selectedPlatform.length > 0) {
//         strQuery = `{$and: [${strQueryGenre}, ${strQueryPlatform}]}`;
//     }
//     //there is no genre
//     if (selectedGenre.length == 0) {
//         strQuery = `{${strQueryPlatform}}`;
//     }
//     //there is no platform
//     if (selectedPlatform.length == 0) {
//         strQuery = `{${strQueryGenre}}`;
//     }
//     //there is no genre nor platform nor title
//     if (selectedGenre.length == 0 && selectedPlatform.length == 0) {
//         strQuery = ``;
//     }
// }