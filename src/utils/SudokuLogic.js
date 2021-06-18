/*  File for the functions to generate and solve the board 
    
    SudokuBoard class definition

    */
export default class Sudoku{
    
    #value = 0;

    constructor(value) {
        this.#value = value;
    }

    get Value() {
        return this.#value;
    }
};

//define the array of objects
var gameBoard = [];
for(var i = 0; i < 9; i++) {
    gameBoard.push(new Sudoku());
    for(var j = 0; j < 9; j++) {
        gameBoard[i].push(new Sudoku());
    }
}

function EmptySpot(board) {
    // checks for the next empty spotm in the board

    for(var i = 0; i < board.length(); i++) {
        for(var j = 0; j < board[i].length(); j++) {
            if(board[i][j] === 0)
                return [i, j];
        }
    }
    return [-1, -1];
}

function CheckRow(board, row, value) {
    /*takes in row and column for the value at question
    gets the value from the row and column and sets it equal to 'testValue'
    iterates through the row to check for any conflictions
    */

    for(var i = row; i < board[row].length(); i++) {
        if(board[row][i].getValue() === value)
            return false;
    }
    return true;
}

function CheckColumn(board, column, value) {
    /*
    takes the board, row and column as parameters
    gets the value at question from the row and column and sets it equal to 'testValue'
    iterates through the column to check for any conflictions
    */

    for(var i = 0; i < board[i][column].length(); i++)
    {
        if(board[i][column].getValue() === value)
        return false;
    }
    return true;
}

function CheckSquare(board, row, column, value) {
    /*
    take the board, row, and column as parameters
    gets the value at question from the row and column
    iterates through the square from the row and column
    */

    //get the most upper row of the sqaure
    var tempRow = math.floor(row / 3);
    tempRow = tempRow * 3;
    //get the most left column of the square
    var tempColumn = math.floor(column/3);
    tempColumn = tempColumn * 3;

    for(var i = tempRow; i < tempRow + 3; i++) {
        for(var j = tempColumn; j < tempColumn + 3; j++) {
            if(board[i][j].getValue() === value)
                return false;
        }
    }

    return true;
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
            return true;
        }

    return false;
}

function BackTracker(board) {

    let nextEmptySpot = EmptySpot(board);
    let row = nextEmptySpot[0];
    let column = nextEmptySpot[1];

    //there is no more spots left to be assigned
    if(row === -1)
        return board;

    for(let num = 1; num <= 9; num++) {
        if(CheckValue(board, row, col, num)) {
            //if returns true, set the value at that position equal to true
            board[row][column] = num;
            //recursivley call the backtracking function
            BackTracker(board);
        }
    }
}