/*  File for the functions to generate and solve the board 
    
    SudokuBoard class definition

    */

export const BLANK_BOARD = [
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

export function EmptySpot(board) {
    // checks for the next empty spot in the board

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
};

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
};

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
            if(board[i][j].getValue() === value)
                return false;
        }
    }

    return true;
};

export function CheckValue(board, row, column, value) {
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
