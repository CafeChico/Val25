var rows = 5;
var columns = 5;

var currTile;
var otherTile;

var turns = 0;

window.onload = function() {
   
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "./pieces/blank.jpg";

            
            tile.addEventListener("dragstart", dragStart); 
            tile.addEventListener("dragover", dragOver); 
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave); 
            tile.addEventListener("drop", dragDrop); 
            tile.addEventListener("dragend", dragEnd); 

            document.getElementById("board").append(tile);
        }
    }


    let pieces = [];
    for (let i=1; i <= rows*columns; i++) {
        pieces.push(i.toString());
    }

    //shuffle
    pieces.reverse();
    for (let i=0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length)

        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    } 

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./pieces/" + pieces[i] + ".png"; //multiple pictures function

        //drag function
        tile.addEventListener("dragstart", dragStart); 
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("dragenter", dragEnter);
        tile.addEventListener("dragleave", dragLeave); 
        tile.addEventListener("drop", dragDrop); 
        tile.addEventListener("dragend", dragEnd); 

        document.getElementById("pieces").append(tile);
    }
}

//Drag Tiles
function dragStart() {
    currTile = this; //this refers to the image being dragged
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this = image being  dropped
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;

    if (checkPuzzleSolved()) {
        displayCompletionMessage();
    }
}

function checkPuzzleSolved() {
    let boardTiles = document.getElementById("board").getElementsByTagName("img");
    let piecesOrder = Array.from(boardTiles).map(tile => {
        return parseInt(tile.src.split('/').pop().split('.')[0]) || 0;
    });

    // Check if the current order matches the sorted order
    for (let i = 0; i < piecesOrder.length; i++) {
        if (piecesOrder[i] !== i + 1) {
            return false;
        }
    }
    return true;
}

// Function to display message when puzzle is completed
function displayCompletionMessage() {
    togglePopup();
}

function togglePopup() {
    document.getElementById("popup-1").classList.toggle("active");
}

// New function to show popup at any time
function showPopup() {
    document.getElementById("popup-1").classList.add("active");
}