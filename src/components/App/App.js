
import './App.css';
import '../SudokuBoard/SudokuBoard.css';
import '../NumPad/NumPad.css';
import React from 'react';
import Tile from '../SudokuBoard/SudokuTile/SudokuTile';
import PepeScrap from '../../images/pepeScrap.png'

const App = ()=> {
  const tiles = () =>{
    const tilesState = [];
    for (let i = 0; i <  81; i++) {
      tilesState.push(<Tile/>)  
    }
    return tilesState;
  }

  return (
    <div className="flex content-center justify-center App bg-primary ">
      <div className="flex-auto w-2/3 justify-self-center max-w-2/3 App-container bg-secondary">
        <header className="App-header">
          <div className="text-8xl tracking-header header-title text-bold text-primary">SUDOKU</div>
        </header>
        <div className="Game-container">
          <div className="Board-container">
            {tiles()}
          </div>
          <div className="Side-controls-container"></div>
          <div className="Number-Btns"></div>
          <div className="image-container">
            <img src={PepeScrap} alt="pepe scrappy" className="pepe-scrap"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
