function generatePuzzle() {
    var zeroes = new Array(9);
    for (var i = 0; i < 9; i++) {
        zeroes[i] = new Array(9).fill(0);
    }
    var solveablePuzzle = fullSolve(zeroes);
    var nRemove = getRandomInt(40, 61); //Remove between 40 and 60 elements.
    
    
    var toRemove = new ArraySet(new Set()); //Create a set of indices to remove
    
    while (toRemove.size < nRemove) {
        var i = getRandomInt(0, 9);
        var j = getRandomInt(0, 9);
        if (!toRemove.has([i, j])) { 
            toRemove.add([i, j]);
        }
    }
    
    //Remove the set indices by setting to zero
    toRemove.s.forEach(function(elem) {
        var i = elem[0];
        var j = elem[1];
        solveablePuzzle[i][j] = 0;
    });
    return solveablePuzzle;
}