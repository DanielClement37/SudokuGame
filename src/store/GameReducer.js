import {actionTypes} from "./types";
import { BeginnerBoardGenerator, IntermediateBoardGenerator, AdvancedBoardGenerator, ExpertBoardGenerator } from "../utils/BoardGenerator";
import {remainingValues} from '../utils/GetRemainingNums'
import { StoreStates } from "./PreviousStates";

let [removedVals, startingBoard, finalBoard] = ExpertBoardGenerator();

export const initialState = {
  boardState: startingBoard,
  initBoardState:startingBoard,
  solvedBoardState: finalBoard,
  removedVals: removedVals,
  selectedTile: {
    row: null,
    col:null,
    value: null,
    unit: null,
  },
  remainingNums: remainingValues(startingBoard),
  isSolved: false,
  undoState: startingBoard
};


export const gameBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_TILE:
      return{
        ...state,
        selectedTile:   action.selectedTile,
      }
    case actionTypes.UPDATE_TILE_VALUE:
      return {
        ...state,
        boardState: action.boardState,
        remainingNums: action.remainingNums,
        selectedTile: action.selectedTile,
        isSolved: action.isSolved,
        undoState: action.undoState
      }
      case actionTypes.UNDO_MOVE:
        return {
          ...state,
          boardState: action.boardState,
          undoState: action.undoState
        }
    default:
      break;
  }
};