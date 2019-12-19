//Module that sets all the pregame styling.
function preGameStyling() {
    //Center the numbers of the elements of the puzzle in their square.
    var board = document.getElementById("board");
    board.classList.add("text-center");

    //Set all the boxes to have their HTML id as: i j, for easy grab.
    var rows = board.getElementsByClassName("row");
    for (var i = 0; i < 9; i++) {
        var row  = rows[i];
        var cols = row.getElementsByClassName("col");
        for (var j = 0; j < 9; j++) {
            var col = cols[j];
            col.setAttribute("id", i.toString() + " " + j.toString());
        }
    }

    //Function to get divs in a quadrant (really ninerant) at row i, column j, with indices refering to 3x3 layout of the board.
    function getElemsInQuadrant(i, j) {
        var elems = [];
        for (var a = 0; a < 3; a++) {
            for (var b = 0; b < 3; b++) {
                var iIndex = a + 3 * i;
                var jIndex = b + 3 * j;
                elems.push(getElemAt(iIndex, jIndex));
            }
        }
        return elems;
    }

    //Set the 3x3 layout X on the board to have different coloured background.
    var quadrants = [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]];
    for (var i = 0; i < quadrants.length; i++) {
        var curr = getElemsInQuadrant(quadrants[i][0], quadrants[i][1]);
        for (var j = 0; j < curr.length; j++) {
            curr[j].classList.add("x-background");
        }
    }

    //Remove dummy numbers from the board
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            getElemAt(i, j).innerHTML = "";
        }
    }

    //Once all the styling has loaded, display the blank board.
    document.getElementsByTagName("body")[0].style.display = "block";
}


//Function to get a div from the puzzle at row i, column j, 9x9 layout.
function getElemAt(i, j) {
    return document.getElementById(i.toString() + " " + j.toString());
}