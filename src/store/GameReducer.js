import { actionTypes } from "./types";
import {
  AdvancedBoardGenerator,
  BeginnerBoardGenerator, ExpertBoardGenerator, IntermediateBoardGenerator
} from "../utils/BoardGenerator";
import { remainingValues } from "../utils/GetRemainingNums";

let bRemovedVals, bStartingBoard, bFinalBoard
let iRemovedVals, iStartingBoard, iFinalBoard
let aRemovedVals, aStartingBoard, aFinalBoard
let eRemovedVals, eStartingBoard, eFinalBoard

const parallelBoardGenerator = async () => {
  await Promise.all([
    ([bRemovedVals, bStartingBoard, bFinalBoard] = (await BeginnerBoardGenerator())),
    ([iRemovedVals, iStartingBoard, iFinalBoard] = (await IntermediateBoardGenerator())),
    ([aRemovedVals, aStartingBoard, aFinalBoard] = (await AdvancedBoardGenerator())),
    ([eRemovedVals, eStartingBoard, eFinalBoard] = (await ExpertBoardGenerator()))
  ]);
}

parallelBoardGenerator()


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
  difficulty: 'Beginner'
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
    default:
      break;
  }
};

export const chooseDifficulty = (difficulty) => {
  switch(difficulty) {
    case 'Beginner':
      return [bRemovedVals, bStartingBoard, bFinalBoard]

    case 'Intermediate':
      return [iRemovedVals, iStartingBoard, iFinalBoard]

    case 'Advanced':
      return [aRemovedVals, aStartingBoard, aFinalBoard]

    case 'Expert':
      return [eRemovedVals, eStartingBoard, eFinalBoard]

    default:
      break
  }
}

export const generateNewBoard = async (difficulty) => {

  switch(difficulty) {
    case 'Beginner':
      [bRemovedVals, bStartingBoard, bFinalBoard] = BeginnerBoardGenerator()
      break

    case 'Intermediate':
      [iRemovedVals, iStartingBoard, iFinalBoard] = IntermediateBoardGenerator()
      break

    case 'Advanced':
      [aRemovedVals, aStartingBoard, aFinalBoard] = AdvancedBoardGenerator()
      break

    case 'Expert':
      [eRemovedVals, eStartingBoard, eFinalBoard] = ExpertBoardGenerator()
      break

    default:
      break
  }
}
