import {actionTypes} from "./types";
import { BeginnerBoardGenerator, IntermediateBoardGenerator, AdvancedBoardGenerator, ExpertBoardGenerator } from "../utils/BoardGenerator";

let [removedVals, startingBoard, finalBoard] = BeginnerBoardGenerator();

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
        boardState: action.boardState
      }
    default:
      break;
  }
};
