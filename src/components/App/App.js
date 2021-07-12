import "./App.css";
import React from "react";
import SudokuBoard from "../SudokuBoard/SudokuBoard";
import NumPad from "../NumPad/NumPad";
import SideControls from "../SideControls/SideControls";
import PepeScrap from "../../images/pepeScrap.png";
import { useStore } from "../../store/Store";
import { actionTypes } from "../../store/types";
import { getRowNum } from "../../utils/Conveter";

const App = () => {
  const [state, dispatch] = useStore();
  const { boardState, selectedTile } = state;

  const updateTile = (numInput) => {
    let newBoardState = [...boardState];

    if (selectedTile.value === 0) {    //TODO: switch to a check that sees if its not a pre placed tile
      const rowNum = getRowNum(selectedTile.row);
      newBoardState[rowNum - 1][parseInt(selectedTile.col) - 1] = numInput;
      dispatch({
        type: actionTypes.UPDATE_TILE_VALUE,
        boardState: newBoardState,
      });
    }
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
