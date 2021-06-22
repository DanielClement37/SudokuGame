
import './App.css';
import '../SudokuBoard/SudokuBoard.css';
import '../NumPad/NumPad.css';
import React from 'react';
import Tile from '../SudokuBoard/SudokuTile/SudokuTile';
import PepeScrap from '../../images/pepeScrap.png'

const App = ()=> {
  const tiles = () =>{
    const tilesState = [];
    let tileStyle = "";

    for (let i = 0; i <  9; i++) {
      for(let j = 0; j < 9; j++){
          if((i+1) % 3 === 0 && (j+1) %3 ===0){
            tileStyle = "tile-row-col";
          } else if((i+1) % 3 === 0){
            tileStyle = "tile-row";
          }else if((j+1) %3 ===0){
            tileStyle = "tile-col";
          }else{
            tileStyle = "tile";
          }
          tilesState.push(<Tile tileStyle={tileStyle}/>);
      }
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
