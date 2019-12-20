//Get a random integer.
function getRandomInt(min, max) {
    var min = Math.ceil(min);
    var max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

//A class that allows for .has to work for a set of arrays.
class ArraySet {
    constructor(s) {
        this.s = s;
        this.size = this.s.size;
    }

    add(array) {
        this.s.add(array);
        this.size = this.s.size;
    }

    has(array) {
        var arrayInS = false;
        this.s.forEach(function(elemInS) {
            var elemsEqual = true;
            for (var i = 0; i < elemInS.length; i++) {
                elemsEqual = elemsEqual && (array[i] == elemInS[i]);
            }
            arrayInS = arrayInS || elemsEqual;
        });
        return arrayInS;
    }
}

function toKey(i, j) {
    return i.toString() + " " + j.toString();
}

function updateEntirePuzzle(puzzle) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            updatePuzzleElem(puzzle, i, j, true);
        }
    }
}

function updatePuzzleElem(puzzle, i, j, bold) {
    if (puzzle[i][j] != 0) {
        if (bold) {
            getElemAt(i, j).innerHTML = "<strong>" + puzzle[i][j].toString() + "</strong>";

        } else {
            getElemAt(i, j).innerHTML = puzzle[i][j].toString();

        }
    } else {
        getElemAt(i, j).innerHTML = "";
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function newPuzzle() {
    puzzle = generatePuzzle();
    updateEntirePuzzle(puzzle);
}

function hideButtons() {
    document.getElementById("inputs").style.display = "none";
    document.getElementById("buttons").style.display = "none";
    document.getElementById("solving").style.display = "block";
}

function solvePuzzle() {
    hideButtons();
    var speed = getSpeed();
    fullSolveWithWait(puzzle, speed);
}

function addListeners() {
    document.getElementById("buttons").style.display = "block";
    document.getElementById("inputs").style.display = "block";
    document.getElementById("solving").style.display = "none";
}

function getSpeed() {
    var speed = parseInt(document.getElementById("speed").value, 10);
    console.log(speed);
    if (speed > 0)  {
        return speed;
    } else {
        return 20;
    }
}