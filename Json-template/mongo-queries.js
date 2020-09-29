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
