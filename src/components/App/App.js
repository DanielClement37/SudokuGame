
import './App.css';
import React from 'react';
import SudokuBoard from '../SudokuBoard/SudokuBoard';
import NumPad from '../NumPad/NumPad';
import SideControls from '../SideControls/SideControls';
import PepeScrap from '../../images/pepeScrap.png';
//import BoardGenerator from '../../utils/BoardGenerator';

const App = ()=> {
  

  return (
    <div className="flex content-center justify-center App bg-primary ">
      <div className="flex-auto w-2/3 justify-self-center max-w-2/3 App-container bg-secondary">
        <header className="App-header">
          <div className="text-8xl tracking-header header-title text-bold text-primary">SUDOKU</div>
        </header>
        <div className="Game-container">
          <SudokuBoard />
          <NumPad />
          <SideControls />
          <div className="image-container">
            <img src={PepeScrap} alt="pepe scrappy" className="pepe-scrap"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
