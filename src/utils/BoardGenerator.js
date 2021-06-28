/* Functions used to generate the board, 
   uses functions from SudokuLogic.js */

//import functions and Sudoku class from SudokuLogic.js

import {CheckValue, EmptySpot, InitializeBoard} from 'src/utils/SudokuLogic.js';

let counter;  //global counter for termination if board generation takes too long

const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function NextStillEmptySpot(board, emptySpotArr) {
    for(coords of emptySpotArr) {
        if(board[coords.row][coords.col] === 0) return {rowIndex: coords.row, colIndex: coords.col}
    }
    return false;
}

function Shuffle(arr) {
    //randomly shuffles an array's contents
    let newArr = [...arr];
    for(let i = newArr.length - 1; i > 0; i++) {
        const j = Math.floor( Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

const Range = (start, end) => {
    const length = end - start + 1;
    return Array.from( {length} , ( _ , i) => start + i)
}

function GetRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function FillBoard(board) {

    let nextEmptySpot = EmptySpot(board);
    let row = nextEmptySpot[0];
    let column = nextEmptySpot[1];

    //there is no more spots left to be assigned
    if(row === -1)
        return board;

    for(let num = 1; num <= 9; num++) {
        // counter is a global variable tracking the iterations performed
        // every so often it could cause heavy backtracking
        counter++;
        if(counter > 20_000_000) throw new Error("Recursion Timeout");

        if(CheckValue(board, row, column, num)) {
            //if returns true, set the value at that position equal to true
            board[row][column].setValue(num);
            //recursivley call the backtracking function
            if(FillBoard(board)) {
                return board;
            }
            //if we were unable to place the future num, that num was wrong.
            //reset it to zero and try next number
            board[row][column] = 0;
        }
    }
    //if unable to place any number, return false
    return false;
}

function UniqueBoardGenerator(board) {
    //function that generates 11 random numbers (1-9) in random locations
    //this allows for the board to be unique every game

    InitializeBoard(board);

    var i = 0; //initialize 
    while(i < 11) {
        let num = GetRandomNumber(1, 9); //get random number 1-9
        let row = GetRandomNumber(0, 8); //get random coordinate 0-8
        let col = GetRandomNumber(0, 8); //get random coordinate 0-8

        if(CheckValue(board, row, col, num) && board[row][col] === 0) {
                //if the random value follows all the rules, insert it
                board[row][col].setValue(num);
                i++; //increment the amount of numbers that get inserted
            }
    }
}

/*  This functions attempts to solve the puzzle by placing the values
    into the board in order from the emptySpotArr 
*/
function FillFromArray(board, emptySpotArr) {
    const emptySpot = NextStillEmptySpot(board, emptySpotArr);
    if(!emptySpot) return board
    for(num of Shuffle(numArr)) {
        removalCounter++;
        if( removalCounter > 60_000_000) throw new Error("Removal Timeout")
        if(CheckValue(board, emptySpot.rowIndex, emptySpot.colIndex, num)) {
            board[emptySpot.rowIndex][emptySpot.colIndex] = num;
            if(FillFromArray(board, emptySpotArr)) return board
            board[emptySpot.rowIndex][emptySpot.colIndex] = 0;
        }
    }
    return false;
}

function ValueRemover(initialBoard, k) {
    /* this function takes the board in and the amount of tiles to remove
    and then removed a value one at a time and checks to see if the board is still 
    solvable */
    const removedVals = [];
    const val = Shuffle( Range(0, 80) );

    while(removedVals.length() <= k) {
        const nextVal = val.pop();
        if(nextVal === undefined) throw new Error("Impossible Game");
        const randRow = Math.floor(nextVal / 9); //integer 0-8
        const randCol = nextVal % 9;

        //guarding against possibly cloning
        if(!initialBoard[randRow]) continue;
        if(initialBoard[randRow][randCol] == 0) continue;

        removedVals.push({ //store the current value at the given coordinates
            rowIndex: randRow,
            colIndex: randCol,
            val: initialBoard[randRow][randCol]
        });

        initialBoard[randRow][randCol] = 0; //remove the value at that spot
        const proposedBoard = initialBoard.map( row => row.slice() ) //clone the new updated board

        /* Attempt to solve the board after removing the value, if it cannot be solved 
        then remove that option from the list */

        if(moreThanOneSolution(initialBoard.map(row => row.slice()))) {
            initialBoard[randRow][randCol] = removedVals.pop().val;
        }
    }

    return[removedVals, initialBoard];
}

/*  the board passed in will be solved completly for each item in the empty spot list
    the empty spot array is rotated on each iteration to ensure that the order of the empty cells
    and the order of solving the game is different each time.
    The solution for each attempt is pushed to a possibleSolutions array as a string to keep
    track of how many possible solutions there are. If there is more than one solution at any point it will
    return true, thus prompting the removeVals function to try a different value
*/
function moreThanOneSolution(board) {
    const possibleSolutions = [];
    const emptySpotArr = EmptySpotCoords(board);
    for(let i = 0; i < emptySpotArr.length; i++) {
        //rotate a clone of the emptySpotArr by one for each iteration
        emptySpotClone = [...emptySpotArr];
        const startingPoint = emptySpotClone.splice(index, 1);
        emptySpotClone.unshift(startingPoint[0]);
        thisSolution = FillFromArray(board.map(row => row.slice()), emptySpotClone)
        possibleSolutions.push(thisSolution.join())
        //if there is more than one solution, then return true
        if(Array.from(new Set(possibleSolutions)).length > 1) return true;
    }
    return false
}

const NewFilledBoard = _ => {
    startTime = new Date;

    const newBoard = BLANK_BOARD.map(row => row.slice());

    UniqueBoardGenerator(newBoard);
    FillBoard(newBoard);
    
    return newBoard;
}

function BeginnerBoardGenerator() {
    /*this function generates a beginner board
    in order for a board to be considered beginner it must show
    between 36 and 46 tiles in the beginning of the game */
    //generator a unique starting board

    let numOfTiles = GetRandomNumber(36, 46); //gets the amount of tiles to keep
    numOfTiles = 81 - numOfTiles;
    //initialize the finalBoard and set it equal to the board
    try {
        counter = 0;
        let finalBoard = NewFilledBoard();

        //copy the new filled board and remove values from it
        //store the removed values to save for clues for later
        let [removedVals, startingBoard] = ValueRemover(finalBoard.map(row => row.slice()), numOfTiles);

        return [removedVals, startingBoard, finalBoard];

    }catch (error) {
        //if error is caught, recall the function
    return BeginnerBoardGenerator();

    }
}

export {BeginnerBoardGenerator};