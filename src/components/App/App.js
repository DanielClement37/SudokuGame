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
import { generatedCheck } from "../../utils/GeneratedCheck";

const App = () => {
  const [state, dispatch] = useStore();
  const { boardState, solvedBoardState, selectedTile, initBoardState, undoState } = state;

  const updateTile = (numInput) => {
    let newBoardState = [...boardState];

    if (!generatedCheck(selectedTile, initBoardState)) {
      const rowNum = getRowNum(selectedTile.row);
      newBoardState[rowNum - 1][parseInt(selectedTile.col) - 1] = numInput;

      const isSolved = checkWin(newBoardState);
      const remainingNums = remainingValues(newBoardState);
      dispatch({
        type: actionTypes.UPDATE_TILE_VALUE,
        boardState: newBoardState,
        remainingNums: remainingNums,
        selectedTile: {
          row: selectedTile.row,
          col: selectedTile.col,
          unit: selectedTile.unit,
          value: numInput,
        },
        isSolved: isSolved,
      });
    }
  };

  const checkWin = (boardState) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (boardState[i][j] !== solvedBoardState[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

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
