import "./App.css";
import React from "react";
import SudokuBoard from "../SudokuBoard/SudokuBoard";
import NumPad from "../NumPad/NumPad";
import SideControls from "../SideControls/SideControls";
import PepeScrap from "../../images/pepeScrap.png";
import { useStore } from "../../store/Store";
import { actionTypes } from "../../store/types";
import { getRowNum } from "../../utils/Conveter";
import { remainingValues } from "../../utils/GetRemainingNums";

const App = () => {
  const [state, dispatch] = useStore();
  const { boardState, solvedBoardState, selectedTile, undoState } = state;

  const updateTile = (numInput) => {
    let newBoardState = [...boardState];
    let newUndoState = [...undoState];

    if (selectedTile.value === 0) {    //TODO: switch to a check that sees if its not a pre placed tile
      const rowNum = getRowNum(selectedTile.row);
      newBoardState[rowNum - 1][parseInt(selectedTile.col) - 1] = numInput;
      if(newUndoState.length > 15) {
        newUndoState.splice(0, 1)
      }
      newUndoState.push(newBoardState);
      const isSolved = checkWin(newBoardState);
      const remainingNums = remainingValues(newBoardState);
      dispatch({
        type: actionTypes.UPDATE_TILE_VALUE,
        boardState: newBoardState,
        remainingNums: remainingNums,
        selectedTile:{
          row: selectedTile.row,
          col: selectedTile.col,
          unit: selectedTile.unit,
          value: numInput
        },
        isSolved:isSolved,
        undoState: newUndoState
      });
    }
  };

  const checkWin = (boardState) =>{
    for(let i = 0; i < 9; i++){
      for(let j = 0; j< 9; j++){
        if(boardState[i][j] !== solvedBoardState[i][j]){
          return false;
        }
      }
    }
    return true
  }

  const btnUpdateTileHandler = (btnValue) => {
    updateTile(btnValue);
  };

  return (
    <div className="flex content-center justify-center App bg-primary ">
      <div className="flex-auto w-2/3 justify-self-center max-w-2/3 App-container bg-secondary">
        <header className="App-header">
          <div className="text-8xl tracking-header header-title text-bold text-primary">
            SUDOKU
          </div>
        </header>
        <div className="Game-container">
          <SudokuBoard />
          <NumPad btnHandler={btnUpdateTileHandler} />
          <SideControls />
          <div className="image-container">
            <img src={PepeScrap} alt="pepe scrappy" className="pepe-scrap" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
