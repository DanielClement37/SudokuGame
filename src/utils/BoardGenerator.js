/* This file contains all the functions used to generate a unique board
    with only one solution. All functions were made by Spencer Smith and
    Anna Fortenberry.
*/

///////////////////////////////////////////////////////////////////////////////////////
/* Contains the blank starting board as well as the functions to check rows, columns and squares
    to see if a value can be placed at the tile at question
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

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0) return [i, j];
    }
  }
  return [-1, -1];
}

export function CheckRow(board, row, value) {
  /*takes in row for the value at question
    gets the value from the row and column and sets it equal to 'testValue'
    iterates through the row to check for any conflictions
    */

<<<<<<< HEAD
  for (var i = 0; i < 8; i++) {
    if (board[row][i] === value) return false;
  }
  return true;
=======
    for(var i = 0; i < 9; i++) {
        if(board[row][i] === value)
            return false
    }
    return true
>>>>>>> 782f8dede0bc59a48b6e5efae7f9d57fdca8ff6a
}

export function CheckColumn(board, column, value) {
  /*
    takes the board, column and value as parameters
    gets the value at question from the row and column and sets it equal to 'testValue'
    iterates through the column to check for any conflictions
    */

<<<<<<< HEAD
  for (var i = 0; i < 8; i++) {
    if (board[i][column] === value) return false;
  }
  return true;
=======
    for(var i = 0; i < 9; i++) {
        if(board[i][column] === value)
            return false
    }
    return true
>>>>>>> 782f8dede0bc59a48b6e5efae7f9d57fdca8ff6a
}

export function CheckSquare(board, row, column, value) {
  /*
    take the board, row, and column as parameters
    gets the value at question from the row and column
    iterates through the square from the row and column
    */

  //get the most upper row of the sqaure
  var tempRow = Math.floor(row / 3);
  tempRow = tempRow * 3;
  //get the most left column of the square
  var tempColumn = Math.floor(column / 3);
  tempColumn = tempColumn * 3;

  for (var i = tempRow; i < tempRow + 3; i++) {
    for (var j = tempColumn; j < tempColumn + 3; j++) {
      if (board[i][j] === value) return false;
    }
  }
  return true;
}

export function CheckValue(board, row, column, value) {
  /*
    this function takes the value and checks the row, column
    and sqaure to check for conflicts, if there are any conflicts
    then it will return false, otherwise it returns true
    */

  if (
    CheckRow(board, row, value) &&
    CheckColumn(board, column, value) &&
    CheckSquare(board, row, column, value)
  ) {
    return true;
  }

  return false;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
/* Contains the functions used to generate the board.
 */

let counter; //global counter for termination if board generation takes too long

const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]; //the numbers that can be placed on the board.

export function NextStillEmptySpot(board, emptySpotArr) {
  //updates the emptySpotArr with cells that are still empty
  //helps the fillFromArray solve the board at question, quicker
  for (var i = 0; i < emptySpotArr.length; i++) {
    if (board[emptySpotArr[i].row][emptySpotArr[i].col] === 0)
      return { row: emptySpotArr[i].row, col: emptySpotArr[i].col };
  }
  return false;
}

export function EmptySpotCoords(proposedBoard) {
  //finds the empty spots on the propesed board and stores their
  //location in the emptySpotArr, this helps the FillFromArray solve
  //the proposed board quicker
  let returnArr = [];
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (0 === proposedBoard[i][j]) {
        returnArr.push({
          row: i,
          col: j,
        });
      }
    }
  }

  return returnArr;
}

export function Shuffle(arr) {
  //randomly shuffles an array's contents
  let newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export const RangeOfNum = (start, end) => {
  //returns a range of numbers, this ensures that each spot only gets checked once
  //in the ValueRemover function
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

export function GetRandomNumber(min, max) {
  //gets a random number between the min and max value
  //helps get a random value and row / column
  //also used to randomly pick a number of tiles to remove in a range
  min = Math.ceil(min);
  max = max + 1;
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export function FillBoard(initialBoard) {
  //Fills the empty board as long as it follows the rules of the game
  //uses recursion and a backtracking algorithm, so if the next number can't get placed
  //it returns false and backtracks to the last tile and tries a different number.

  //get the next empty tile
  let nextEmptySpot = EmptySpot(initialBoard);
  let row = nextEmptySpot[0]; //index 0 corresponds to the row
  let column = nextEmptySpot[1]; //index 1 corresponds to the column

  //there is no more spots left to be assigned
  if (row === -1) return initialBoard;

  //shuffle the numArr to get a random order
  let randNumArr = Shuffle(numArr);
  let num;

  //loop for the length of the randNumArr
  for (num of randNumArr) {
    // counter is a global variable tracking the iterations performed
    // every so often it could cause heavy backtracking
    counter++;
    if (counter > 20_000_000) throw new Error("Recursion Timeout");

    if (CheckValue(initialBoard, row, column, num)) {
      //if returns true, set the value at that position equal to true
      initialBoard[row][column] = num;
      //recursivley call the backtracking function
      if (FillBoard(initialBoard)) {
        return initialBoard;
      }
      //if we were unable to place the future num, that num was wrong.
      //reset it to zero and try next number
      initialBoard[row][column] = 0;
    }
  }
  //if unable to place any number, return false, this makes the previous round try the next number
  return false;
}

export function FillFromArray(board, emptySpotArr) {
  /*  This functions attempts to solve the puzzle by placing the values
    into the board in order from the emptySpotArr 
*/
  //get the next empty spot
  const emptySpot = NextStillEmptySpot(board, emptySpotArr);

  //if no emptyspots return the solved board
  if (!emptySpot) return board;

  for (var num = 1; num <= 9; num++) {
    //if iterations exceed the value then throw error, and try again
    //do this because not all boards can be impossible game boards
    counter++;
    if (counter > 60_000_000) throw new Error("Removal Timeout");
    if (CheckValue(board, emptySpot.row, emptySpot.col, num)) {
      board[emptySpot.row][emptySpot.col] = num;
      if (FillFromArray(board, emptySpotArr)) {
        return board;
      }
      board[emptySpot.row][emptySpot.col] = 0;
    }
  }
  return false;
}

export const ValueRemover = (initialBoard, k) => {
  /* this function takes the board in and the amount of tiles to remove
    and then removed a value one at a time and checks to see if the board is still 
    solvable, k is the number of tiles to removed*/
  const removedVals = [];
  const val = Shuffle(RangeOfNum(0, 80));

  while (removedVals.length < k) {
    const nextVal = val.pop(); //gets the next random num between 0-80
    //not all gameboards can be impossible or expert games, so if its exhausts all the possible
    //values to remove then throw an error
    if (nextVal === undefined) throw new Error("Impossible Game");
    const randRow = Math.floor(nextVal / 9); //row = math.floor((0-80 / 9)), get the rand row
    const randCol = nextVal % 9; //col = (0-80) % 9, gets the modulus of the random number

    //guarding against possibly cloning
    if (!initialBoard[randRow]) continue;
    if (initialBoard[randRow][randCol] === 0) continue; //if value is already removed, continue

    removedVals.push({
      //store the current value at the given coordinates
      row: randRow,
      col: randCol,
      val: initialBoard[randRow][randCol],
    });

    initialBoard[randRow][randCol] = 0; //remove the value at that spot
    const proposedBoard = JSON.parse(JSON.stringify(initialBoard)); //clone the new updated board

    /* Attempt to solve the board after removing the value, if it cannot be solved,
        or if it has more than one solution then remove that option from the list */

    //call moreThanOneSolution on the proposed board
    if (moreThanOneSolution(proposedBoard)) {
      //if there is more than one solution, then pop the last tile from the list and
      //add it back to the board
      initialBoard[randRow][randCol] = removedVals.pop().val;
    }
  }

  return [removedVals, initialBoard];
};

export function moreThanOneSolution(proposedBoard) {
  /*  the board passed in will be solved completly for each item in the empty spot list
    the empty spot array is rotated on each iteration to ensure that the order of the empty cells
    and the order of solving the game is different each time.
    The solution for each attempt is pushed to a possibleSolutions array as a string to keep
    track of how many possible solutions there are. If there is more than one solution at any point it will
    return true, thus prompting the removeVals function to try a different value
*/
  const possibleSolutions = []; //intialize the proposedSolutions list
  const emptySpotArr = EmptySpotCoords(proposedBoard); //get the coords of the empty spots from the proposed board
  let emptySpotClone, thisSolution;

  for (var index = 0; index < emptySpotArr.length; index++) {
    //clone the emptySpotArr
    emptySpotClone = [...emptySpotArr];
    //rotate a clone of the emptySpotArr by one for each iteration
    const startingPoint = emptySpotClone.splice(index, 1);
    emptySpotClone.unshift(startingPoint[0]);
    //save the solution from FillFromArray as this solution
    thisSolution = FillFromArray(
      JSON.parse(JSON.stringify(proposedBoard)),
      emptySpotClone
    );
    //push the solution to possibleSolutions
    possibleSolutions.push(thisSolution.join());
    //if there is more than one solution, then return true
    if (Array.from(new Set(possibleSolutions)).length > 1) return true;
  }
  return false;
}

export const NewFilledBoard = (_) => {
  //get a copy of the BLANK_BOARD
  const newBoard = JSON.parse(JSON.stringify(BLANK_BOARD));
  //fill the empty board
  FillBoard(newBoard);

  return newBoard;
};

///////////////////////////////////////////////////////////////////////////////////////////////////

/* Functions for generating boards for varying levels of difficulty */

/* Function:    Generates Board of Beginner Diffuclty
   Criteria:    Between 36 and 46 tiles must be initialized(displayed) with the board at start of game
   Parameters:  None Required
   Return:      List removedVals, 2D array startingBoard, 2D array finalBoard when board is valid
                If error caught, return BeginnerBoardGenerator()
*/
export function BeginnerBoardGenerator() {
  let numTiles = GetRandomNumber(36, 46); //number of tiles to keep on a beginner level board
  numTiles = 81 - numTiles; //total cells - tiles to keep = tiles to remove

  try {
    counter = 0;
    let finalBoard = NewFilledBoard(); //final board equals the fully filled board

    //copy the new filled board and remove values from it
    //store the removed values to save for clues later
    let [removedVals, startingBoard] = ValueRemover(
      JSON.parse(JSON.stringify(finalBoard)),
      numTiles
    );

    return [removedVals, startingBoard, finalBoard];
  } catch (error) {
    //if error is caught, recall the function
    return BeginnerBoardGenerator();
  }
}

/* Function:    Generates Board of Intermediate Diffuclty
   Criteria:    Between 32 and 35 tiles must be initialized(displayed) with the board at start of game
   Parameters:  None Required
   Return:      List removedVals, 2D array startingBoard, 2D array finalBoard when board is valid
                If error caught, return IntermediateBoardGenerator()
*/
export function IntermediateBoardGenerator() {
  let numTiles = GetRandomNumber(32, 35); //number of tiles to keep on a beginner level board
  numTiles = 81 - numTiles; //total cells - tiles to keep = tiles to remove

  try {
    counter = 0;
    let finalBoard = NewFilledBoard(); //final board equals the fully filled board

    //copy the new filled board and remove values from it
    //store the removed values to save for clues later
    let [removedVals, startingBoard] = ValueRemover(
      JSON.parse(JSON.stringify(finalBoard)),
      numTiles
    );

    return [removedVals, startingBoard, finalBoard];
  } catch (error) {
    //if error is caught, recall the function
    return IntermediateBoardGenerator();
  }
}

/* Function:    Generates Board of Advanced Diffuclty
   Criteria:    Between 28 and 31 tiles must be initialized(displayed) with the board at start of game
   Parameters:  None Required
   Return:      List removedVals, 2D array startingBoard, 2D array finalBoard when board is valid
                If error caught, return AdvancedBoardGenerator()
*/
export function AdvancedBoardGenerator() {
  let numTiles = GetRandomNumber(28, 31); //number of tiles to keep on a beginner level board
  numTiles = 81 - numTiles; //total cells - tiles to keep = tiles to remove

  try {
    counter = 0;
    let finalBoard = NewFilledBoard(); //final board equals the fully filled board

    //copy the new filled board and remove values from it
    //store the removed values to save for clues later
    let [removedVals, startingBoard] = ValueRemover(
      JSON.parse(JSON.stringify(finalBoard)),
      numTiles
    );

    return [removedVals, startingBoard, finalBoard];
  } catch (error) {
    //if error is caught, recall the function
    return AdvancedBoardGenerator();
  }
}

/* Function:    Generates Board of Expert Diffuclty
   Criteria:    Between 17 and 27 tiles must be initialized(displayed) with the board at start of game
   Parameters:  None Required
   Return:      List removedVals, 2D array startingBoard, 2D array finalBoard when board is valid
                If error caught, return ExpertBoardGenerator()
*/
export function ExpertBoardGenerator() {
  let numTiles = GetRandomNumber(17, 27); //number of tiles to keep on a beginner level board
  numTiles = 81 - numTiles; //total cells - tiles to keep = tiles to remove

  try {
    counter = 0;
    let finalBoard = NewFilledBoard(); //final board equals the fully filled board

    //copy the new filled board and remove values from it
    //store the removed values to save for clues later
    let [removedVals, startingBoard] = ValueRemover(
      JSON.parse(JSON.stringify(finalBoard)),
      numTiles
    );

    return [removedVals, startingBoard, finalBoard];
  } catch (error) {
    //if error is caught, recall the function
    return ExpertBoardGenerator();
  }
}

//IMPORT STATEMENTS FOR DANIEL
/*
import { NextStillEmptySpot, EmptySpotCoords, Shuffle, RangeOfNum, GetRandomNumber } from "./BoardGenerator";
import { BLANK_BOARD, CheckColumn, CheckRow, CheckSquare, CheckValue, EmptySpot } from './BoardGenerator';
import { FillBoard, FillFromArray, ValueRemover, moreThanOneSolution, NewFilledBoard } from './BoardGenerator';
import { BeginnerBoardGenerator, IntermediateBoardGenerator, AdvancedBoardGenerator, ExpertBoardGenerator } from "./BoardGenerator";
*/
