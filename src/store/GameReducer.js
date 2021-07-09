import {actionTypes} from "./types";

export const initialState = {
  boardState: [
    [4, 8, 0, 0, 0, 0, 0, 6, 3],
    [0, 0, 0, 0, 3, 0, 4, 2, 0],
    [0, 0, 2, 0, 0, 1, 0, 0, 0],
    [0, 5, 4, 0, 8, 9, 0, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 0, 6],
    [2, 1, 0, 0, 0, 3, 9, 0, 0],
    [0, 0, 0, 5, 1, 0, 0, 0, 8],
    [0, 4, 3, 2, 7, 0, 6, 9, 1],
    [1, 7, 8, 3, 9, 0, 5, 4, 0],
  ],
  solvedBoardState: [
    [4, 8, 5, 9, 2, 7, 1, 6, 3],
    [7, 6, 1, 8, 3, 5, 4, 2, 9],
    [9, 3, 2, 4, 6, 1, 8, 7, 5],
    [3, 5, 4, 6, 8, 9, 2, 1, 7],
    [8, 9, 7, 1, 4, 2, 3, 5, 6],
    [2, 1, 6, 7, 5, 3, 9, 8, 4],
    [6, 2, 9, 5, 1, 4, 7, 3, 8],
    [5, 4, 3, 2, 7, 8, 6, 9, 1],
    [1, 7, 8, 3, 9, 6, 5, 4, 2],
  ],
  selectedTile: {
    row: '',
    col:''
  },
  selectedUnit: '',
  selectedValue: 0,
  selectedRow: '',
  selectedColumn: '',
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
        boardState: action.payload.boardState
      }
    default:
      break;
  }
};
