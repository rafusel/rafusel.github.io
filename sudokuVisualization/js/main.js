function main() {
    preGameStyling(); //From styling.js
    var puzzle;
    puzzle = generatePuzzle();
    updateEntirePuzzle(puzzle); //From util.js
    document.getElementById("new-puzzle").addEventListener("click", newPuzzle, true);
    document.getElementById("solve-puzzle").addEventListener("click", solvePuzzle, true);
    
}

//Execute the main function when the document has loaded.
 document.onload = main();