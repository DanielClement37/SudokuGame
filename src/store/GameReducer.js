import { actionTypes } from "./types";
import { BeginnerBoardGenerator } from "../utils/BoardGenerator";
import { remainingValues } from "../utils/GetRemainingNums";

let [removedVals, startingBoard, finalBoard] = BeginnerBoardGenerator();

export const initialState = {
  boardState: startingBoard,
  initBoardState: startingBoard.map((inner) => inner.slice()),
  solvedBoardState: finalBoard,
  removedVals: removedVals,
  selectedTile: {
    row: null,
    col: null,
    value: null,
    unit: null,
  },
  remainingNums: remainingValues(startingBoard),
  isSolved: false,
  undoState: [startingBoard.map((copy) => copy.slice())],
  difficulty: "Beginner",
  isNotesMode: false,
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
    default:
      break;
  }
};
