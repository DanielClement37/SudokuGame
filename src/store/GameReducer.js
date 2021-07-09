import {actionTypes} from "./types";
import { BeginnerBoardGenerator, IntermediateBoardGenerator, AdvancedBoardGenerator, ExpertBoardGenerator } from "../utils/BoardGenerator";

let [removedVals, startingBoard, finalBoard] = BeginnerBoardGenerator();

export const initialState = {
  boardState: startingBoard,
  solvedBoardState: finalBoard,
  removedVals: removedVals,
  selectedTile: {
    row: null,
    col:null
  },
  selectedUnit: null,
  selectedValue: null,
  selectedRow: null,
  selectedColumn: null,
};


export const gameBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_TILE:
      return{
        ...state,
        selectedTile:   action.selectedTile,
        selectedUnit:   action.selectedUnit,
        selectedRow:    action.selectedRow,
        selectedColumn: action.selectedColumn,
        selectedValue:  action.selectedValue
      }
    case actionTypes.UPDATE_TILE_VALUE:
      return {
        ...state,
        boardState: action.boardState
      }
    default:
      break;
  }
};
