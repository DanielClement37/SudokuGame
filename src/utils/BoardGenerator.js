/* Functions used to generate the board, 
   uses functions from SudokuLogic.js */

import {gameBoard, CheckColumn, CheckRow, CheckSquare, CheckValue, EmptySpot, InitializeBoard} from 'SudokuLogic.js';

function GetRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function BackTracker(board) {

    let nextEmptySpot = EmptySpot(board);
    let row = nextEmptySpot[0];
    let column = nextEmptySpot[1];

    //there is no more spots left to be assigned
    if(row === -1)
        return board;

    for(let num = 1; num <= 9; num++) {
        if(CheckValue(board, row, column, num)) {
            //if returns true, set the value at that position equal to true
            board[row][column].setValue(num);
            //recursivley call the backtracking function
            BackTracker(board);
        }
    }
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

        if(CheckValue(board, row, col, num)) {
                //if the random value follows all the rules, insert it
                board[row][col].setValue(num);
                i++; //increment the amount of numbers that get inserted
            }
    }
}

function BeginnerBoardGenerator(board) {
    //generator a unique starting board
    UniqueBoardGenerator(board);

    //fill in the remaining empty spots
    BackTracker(board);

}