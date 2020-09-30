var htmlBody = document.querySelector("body");

// Add 20 items.
var nextItem = 1;
var loadMore = function() {
    for (var i = 0; i < 20; i++) {
        var item = document.createElement('li');
        item.innerText = 'Item ' + nextItem++;
        listElm.appendChild(item);
    }
}

// Detect when scrolled to bottom.
document.addEventListener('scroll', function() {

    console.log(document.scrollTop, document.clientHeight, document.scrollHeight)
    if (document.scrollTop + document.clientHeight >= document.scrollHeight) {
        //     loadMore();
        console.log("toto");
    }
});

// Initially load some items.
//loadMore();