/*
SOLVER
*/
// Function that takes in the puzzle as a 2D array and returns the solution.
async function fullSolveWithWait(puzzle, speed) {
    var backtrack = [];
    var elemsTried = {};
    var i = 0;
    var j = 0;
    while (i < puzzle.length) {
        while (j < puzzle[i].length) {
            if (puzzle[i][j] == 0) { // This is an element we may have to backtrack to.
                backtrack.push([i, j]);
                elemsTried[toKey(i, j)] = new Set();
            }
            if (backtrack.length > 0 && backtrack[backtrack.length - 1][0] == i && backtrack[backtrack.length - 1][1] ==  j) { //We have to try and solve this element currently
                var possibleElems = new Set(); //Get a set of all the possible elements that we could solve with.
                for (var e = 1; e < 10; e++) { 
                    possibleElems.add(e);
                }
                removeTaken(possibleElems, puzzle, i, j); // Remove all the elements that occur in this row, column and box.
                elemsTried[toKey(i, j)].forEach(function(element) {
                    possibleElems.delete(element);
                });
                
                if (possibleElems.size > 0) { //Does this element give us a possible solution
                    //puzzle[i][j] = min(possibleElems)
                    puzzle[i][j] = Array.from(possibleElems)[getRandomInt(0, possibleElems.size)];
                    updatePuzzleElem(puzzle, i, j, false);
                    await sleep(speed);
                    elemsTried[toKey(i, j)].add(puzzle[i][j]);
                    j += 1;
                } else { //This element does not give a possible solution: backtrack
                    puzzle[i][j] = 0; //Reset the current element
                    updatePuzzleElem(puzzle, i, j, false);
                    await sleep(speed);
                    backtrack.pop(); //Remove this an element we need to backtrack to
                    delete elemsTried[toKey(i, j)];
                    i = backtrack[backtrack.length - 1][0]; //Get the new values we need to backtrack to
                    j = backtrack[backtrack.length - 1][1];
                }
            }
        
            else { //Don't need to solve this one.
                j += 1;
            }
        }
        i += 1;
        j = 0;
        
    } 
    addListeners();
    return puzzle;
}

function fullSolve(puzzle) {
    var backtrack = [];
    var elemsTried = {};
    var i = 0;
    var j = 0;
    while (i < puzzle.length) {
        while (j < puzzle[i].length) {
            if (puzzle[i][j] == 0) { // This is an element we may have to backtrack to.
                backtrack.push([i, j]);
                elemsTried[toKey(i, j)] = new Set();
            }
            if (backtrack.length > 0 && backtrack[backtrack.length - 1][0] == i && backtrack[backtrack.length - 1][1] ==  j) { //We have to try and solve this element currently
                var possibleElems = new Set(); //Get a set of all the possible elements that we could solve with.
                for (var e = 1; e < 10; e++) { 
                    possibleElems.add(e);
                }
                removeTaken(possibleElems, puzzle, i, j); // Remove all the elements that occur in this row, column and box.
                elemsTried[toKey(i, j)].forEach(function(element) {
                    possibleElems.delete(element);
                });
                
                if (possibleElems.size > 0) { //Does this element give us a possible solution
                    //puzzle[i][j] = min(possibleElems)
                    puzzle[i][j] = Array.from(possibleElems)[getRandomInt(0, possibleElems.size)];
                    elemsTried[toKey(i, j)].add(puzzle[i][j]);
                    j += 1;
                } else { //This element does not give a possible solution: backtrack
                    puzzle[i][j] = 0; //Reset the current element
                    backtrack.pop(); //Remove this an element we need to backtrack to
                    delete elemsTried[toKey(i, j)];
                    i = backtrack[backtrack.length - 1][0]; //Get the new values we need to backtrack to
                    j = backtrack[backtrack.length - 1][1];
                }
            }
        
            else { //Don't need to solve this one.
                j += 1;
            }
        }
        i += 1;
        j = 0;
        
    } 
    return puzzle;
}

/*
FUNCTIONS USED BY SOLVER
*/
//Remove all taken elements in a given row, column and box.
function removeTaken(possibleElems, puzzle, i, j) {
    checkRow(possibleElems, puzzle, i);
    checkCol(possibleElems, puzzle, j);
    checkBox(possibleElems, puzzle, i, j);
}

//Remove all elements in the ith row from possible elements.
function checkRow(possibleElems, puzzle, i) {
    for (var j = 0; j < puzzle[i].length; j++) {
        possibleElems.delete(puzzle[i][j]);
    }
}

//Remove all elements in the jth column from possible element.
function checkCol(possibleElems, puzzle, j) {
    for (var i = 0; i < 9; i++) {
        possibleElems.delete(puzzle[i][j]);
    }
}

//Remove all elements
function checkBox(possibleElems, puzzle, i, j) {
    quadrant = [Math.floor(i/3), Math.floor(j/3)]; //Which quadrant is the current place in.
    for (var a = 0; a < 3; a++) {
        for (var b = 0; b < 3; b++) {
            possibleElems.delete(puzzle[a + 3 * quadrant[0]][b + 3 * quadrant[1]]); //Indexing trickery to get the indices in square.
        }
    }
}
