/* Functions used to generate the board, uses functions from SudokuLogic.js */

//import functions and Sudoku class from SudokuLogic.js

//import {BLANK_BOARD, CheckValue, EmptySpot} from './SudokuLogic.js'

///////////////////////////////////////////////////////////////////////////////////////
const BLANK_BOARD = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function EmptySpot(board) {
    // checks for the next empty spot in the board

    for(var i = 0; i < board.length; i++) {
        for(var j = 0; j < board[i].length; j++) {
            if(board[i][j] === 0)
                return [i, j];
        }
    }
    return [-1, -1];
}

function CheckRow(board, row, value) {
    /*takes in row for the value at question
    gets the value from the row and column and sets it equal to 'testValue'
    iterates through the row to check for any conflictions
    */

    for(var i = 0; i < 8; i++) {
        if(board[row][i] === value)
            return false
    }
    return true
}

function CheckColumn(board, column, value) {
    /*
    takes the board, column and value as parameters
    gets the value at question from the row and column and sets it equal to 'testValue'
    iterates through the column to check for any conflictions
    */

    for(var i = 0; i < 8; i++) {
        if(board[i][column] === value)
            return false
    }
    return true
}

function CheckSquare(board, row, column, value) {
    /*
    take the board, row, and column as parameters
    gets the value at question from the row and column
    iterates through the square from the row and column
    */

    //get the most upper row of the sqaure
    var tempRow = Math.floor(row / 3);
    tempRow = tempRow * 3;
    //get the most left column of the square
    var tempColumn = Math.floor(column/3);
    tempColumn = tempColumn * 3;

    for(var i = tempRow; i < tempRow + 3; i++) {
        for(var j = tempColumn; j < tempColumn + 3; j++) {
            if(board[i][j] === value)
                return false
        }
    }
    return true
}

function CheckValue(board, row, column, value) {
    /*
    this function takes the value and checks the row, column
    and sqaure to check for conflicts, if there are any conflicts
    then it will return false, otherwise it returns true
    */

    if(CheckRow(board, row, value) && 
        CheckColumn(board, column, value) &&
        CheckSquare(board, row, column, value)) {
            return true
        }

    return false
}

///////////////////////////////////////////////////////////////////////////////////////////////////

let counter;  //global counter for termination if board generation takes too long

const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function NextStillEmptySpot(board, emptySpotArr) {
    //updates the emptySpotArr with cells that are still empty
    for(var i = 0; i < emptySpotArr.length; i++) {
        if(board[emptySpotArr[i].row][emptySpotArr[i].col] === 0) 
            return {row: emptySpotArr[i].row, col: emptySpotArr[i].col}
    }
    return false
}

function EmptySpotCoords(proposedBoard) {
    let returnArr = []
    
    for(var i = 0; i < 9; i++)
    {
        for(var j = 0; j < 9; j++)
        {
            if(0 === proposedBoard[i][j])
            {
                returnArr.push({
                    row: i,
                    col: j
                })
            }
        }
    }
      
    return returnArr
}

function Shuffle(arr) {
    //randomly shuffles an array's contents
    let newArr = [...arr]
    for(let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor( Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr
}

const RangeOfNum = (start, end) => {
    //returns a range of numbers
    const length = end - start + 1;
    return Array.from( {length} , ( _ , i) => start + i)
}

function GetRandomNumber(min, max) {
    min = Math.ceil(min);
    max = max + 1;
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function FillBoard(initialBoard) {

    //get the next empty tile
    let nextEmptySpot = EmptySpot(initialBoard)
    let row = nextEmptySpot[0] //index 0 corresponds to the row
    let column = nextEmptySpot[1] //index 1 corresponds to the column

    //there is no more spots left to be assigned
    if(row === -1)
        return initialBoard

    let randNumArr = Shuffle(numArr)
    let num

    for(num of randNumArr) {
        // counter is a global variable tracking the iterations performed
        // every so often it could cause heavy backtracking
        counter++
        if(counter > 20_000_000) throw new Error("Recursion Timeout")

        if(CheckValue(initialBoard, row, column, num)) {
            //if returns true, set the value at that position equal to true
            initialBoard[row][column] = num
            //recursivley call the backtracking function
            if(FillBoard(initialBoard)) {
                return initialBoard
            }
            //if we were unable to place the future num, that num was wrong.
            //reset it to zero and try next number
            initialBoard[row][column] = 0
        }
    }
    //if unable to place any number, return false, this makes the previous round try the next number
    return false
}

/*  This functions attempts to solve the puzzle by placing the values
    into the board in order from the emptySpotArr 
*/
function FillFromArray(board, emptySpotArr) {
    const emptySpot = NextStillEmptySpot(board, emptySpotArr)

    if(!emptySpot) 
        return board

    for(var num = 1; num <= 9; num++) {
        counter++
        if( counter > 60_000_000) throw new Error("Removal Timeout")
        if(CheckValue(board, emptySpot.row, emptySpot.col, num)) {
            board[emptySpot.row][emptySpot.col] = num;
            if(FillFromArray(board, emptySpotArr)){ return board }
            board[emptySpot.row][emptySpot.col] = 0;
        }
    }
    return false
}

const ValueRemover = (initialBoard, k) => {
    /* this function takes the board in and the amount of tiles to remove
    and then removed a value one at a time and checks to see if the board is still 
    solvable */
    const removedVals = [];
    const val = Shuffle( RangeOfNum(0, 80) );

    while(removedVals.length <= k) {
        const nextVal = val.pop();
        if(nextVal === undefined) throw new Error("Impossible Game");
        const randRow = Math.floor(nextVal / 9); //integer 0-8
        const randCol = nextVal % 9;

        //guarding against possibly cloning
        if(!initialBoard[randRow]) continue;
        if(initialBoard[randRow][randCol] === 0) continue;

        removedVals.push({ //store the current value at the given coordinates
            row: randRow,
            col: randCol,
            val: initialBoard[randRow][randCol]
        })

        initialBoard[randRow][randCol] = 0 //remove the value at that spot
        const proposedBoard = JSON.parse(JSON.stringify(initialBoard)) //clone the new updated board

        /* Attempt to solve the board after removing the value, if it cannot be solved 
        then remove that option from the list */

        if(moreThanOneSolution(proposedBoard)) {
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
function moreThanOneSolution(proposedBoard) {

    const possibleSolutions = []
    const emptySpotArr = EmptySpotCoords(proposedBoard)
    let emptySpotClone, thisSolution

    for(var index = 0; index < emptySpotArr.length; index++) {
        //rotate a clone of the emptySpotArr by one for each iteration
        emptySpotClone = [...emptySpotArr]
        const startingPoint = emptySpotClone.splice(index, 1)
        emptySpotClone.unshift(startingPoint[0])
        thisSolution = FillFromArray(JSON.parse(JSON.stringify(proposedBoard)), emptySpotClone)
        possibleSolutions.push(thisSolution.join())
        //if there is more than one solution, then return true
        if(Array.from(new Set(possibleSolutions)).length > 1) return true
    }
    return false
}

const NewFilledBoard = _ => {
    //let startTime = new Date();

    const newBoard = JSON.parse(JSON.stringify(BLANK_BOARD))

    FillBoard(newBoard)
    
    return newBoard
}

function BeginnerBoardGenerator() {
    /*this function generates a beginner board
    in order for a board to be considered beginner it must show
    between 36 and 46 tiles in the beginning of the game */
    //generator a unique starting board

    let numOfTiles = GetRandomNumber(36, 46) //gets the amount of tiles to keep
    numOfTiles = 81 - numOfTiles
    //initialize the finalBoard and set it equal to the board
    try {
        counter = 0
        let finalBoard = NewFilledBoard()

        //copy the new filled board and remove values from it
        //store the removed values to save for clues for later
        let [removedVals, startingBoard] = ValueRemover(JSON.parse(JSON.stringify(finalBoard)), numOfTiles)

        return [removedVals, startingBoard, finalBoard]

    }catch (error) {
        //if error is caught, recall the function
        return BeginnerBoardGenerator()
    }
}

let [removedVals, startBoard, finalBoard] = BeginnerBoardGenerator();


//let solvedBoard = NewFilledBoard()

console.table(startBoard)
console.table(finalBoard)

