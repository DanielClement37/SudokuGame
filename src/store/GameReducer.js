import { actionTypes } from "./types";
import {
  BeginnerBoardGenerator,
  IntermediateBoardGenerator,
} from "../utils/BoardGenerator";
import { remainingValues } from "../utils/GetRemainingNums";
import {
  generateAdvancedBoard,
  generateExpertBoard,
  backupAdvancedBoards,
  backupExpertBoards,
} from "../utils/BackroundBoardGenerators";

let bRemovedVals, bStartingBoard, bFinalBoard;
let iRemovedVals, iStartingBoard, iFinalBoard;
let aRemovedVals, aStartingBoard, aFinalBoard;
let eRemovedVals, eStartingBoard, eFinalBoard;

const generateBeginnerBoard = () => {
  [bRemovedVals, bStartingBoard, bFinalBoard] = BeginnerBoardGenerator();
};

const generateIntermediateBoard = () => {
  [iRemovedVals, iStartingBoard, iFinalBoard] = IntermediateBoardGenerator();
};

export const advancedBoards = [] //used to store up to 5 back up advanced boards
export const expertBoards = [] //used to store up to 5 back up expert boards

generateBeginnerBoard();
generateIntermediateBoard();

//takes our arrays that store the back-up boards and fills them asynchronously



export const initialState = {
  boardState: bStartingBoard,
  initBoardState: bStartingBoard.map((inner) => inner.slice()),
  solvedBoardState: bFinalBoard,
  removedVals: bRemovedVals,
  selectedTile: {
    row: null,
    col: null,
    value: null,
    unit: null,
  },
  remainingNums: remainingValues(bStartingBoard),
  isSolved: false,
  undoState: [bStartingBoard.map((copy) => copy.slice())],
  difficulty: "Beginner",
};

export const gameBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_TILE:
      return {
        ...state,
        selectedTile: action.selectedTile,
      };
    case actionTypes.UPDATE_TILE_VALUE:
      return {
        ...state,
        boardState: action.boardState,
        remainingNums: action.remainingNums,
        selectedTile: action.selectedTile,
        isSolved: action.isSolved,
        undoState: state.undoState.concat([
          action.boardState.map((copy) => copy.slice()),
        ]),
      };
    case actionTypes.UNDO_MOVE:
      return {
        ...state,
        boardState: action.boardState,
        undoState: action.undoState,
        remainingNums: action.remainingNums,
      };
    case actionTypes.NOTES_TOGGLE:
      return {
        ...state,
        isNotesMode: action.isNotesMode,
      };
    case actionTypes.ERASE_TILE:
      return {
        ...state,
        boardState: action.boardState,
        remainingNums: action.remainingNums,
        selectedTile: action.selectedTile,
      };
    case actionTypes.NEW_GAME:
      return {
        boardState: action.boardState.map((copy) => copy.slice()),
        initBoardState: action.initBoardState.map((copy) => copy.slice()),
        solvedBoardState: action.solvedBoardState.map((copy) => copy.slice()),
        removedVals: action.removedVals,
        selectedTile: action.selectedTile,
        remainingNums: action.remainingNums,
        isSolved: false,
        undoState: action.undoState,
        difficulty: action.difficulty,
      };
    default:
      break;
  }
};

export const chooseDifficulty = (difficulty) => {
  switch (difficulty) {
    case "Beginner":
      return [bRemovedVals, bStartingBoard, bFinalBoard];

    case "Intermediate":
      return [iRemovedVals, iStartingBoard, iFinalBoard];

    case "Advanced":
      let aNewBoard = advancedBoards.shift();
      aRemovedVals = aNewBoard.removedVals;
      aStartingBoard = aNewBoard.startingBoard;
      aFinalBoard = aNewBoard.finalBoard;
      return [aRemovedVals, aStartingBoard, aFinalBoard];

    case "Expert":
      let eNewBoard = expertBoards.shift();
      eRemovedVals = eNewBoard.removedVals;
      eStartingBoard = eNewBoard.startingBoard;
      eFinalBoard = eNewBoard.finalBoard;
      return [eRemovedVals, eStartingBoard, eFinalBoard];

    default:
      break;
  }
};

export const generateNewBoard = async (difficulty) => {
  switch (difficulty) {
    case "Beginner":
      generateBeginnerBoard();
      break;

    case "Intermediate":
      generateIntermediateBoard();
      break;

    case "Advanced":
      [aRemovedVals, aStartingBoard, aFinalBoard] =
        await generateAdvancedBoard();
      advancedBoards.push({
        removedVals: aRemovedVals,
        startingBoard: aStartingBoard,
        finalBoard: aFinalBoard,
      });
      break;

    case "Expert":
      [eRemovedVals, eStartingBoard, eFinalBoard] = await generateExpertBoard();
      expertBoards.push({
        removedVals: eRemovedVals,
        startingBoard: eStartingBoard,
        finalBoard: eFinalBoard,
      });
      break;

    default:
      break;
  }
};
