
import './SudokuBoard.css';
import React from 'react'
import Tile from './SudokuTile/SudokuTile';

const SudokuBoard = ()=> {

    const tiles = () =>{
        const tilesState = [];
        let tileStyle = "";
    
        for (let i = 0; i <  9; i++) {
          for(let j = 0; j < 9; j++){
            if((i+1) % 3 === 0 && (j+1) %3 ===0){
              tileStyle = "tile-row-col tile-hoverable";
            } else if((i+1) % 3 === 0){
              tileStyle = "tile-row tile-hoverable";
            }else if((j+1) %3 ===0){
              tileStyle = "tile-col tile-hoverable";
            }else{
              tileStyle = "tile tile-hoverable";
            }
            tilesState.push(<Tile tileStyle={tileStyle} x={j} y={i} />);
          }
        }
        return tilesState;
    }

    return (
        <div className="Board-container">
            {tiles()}
        </div>
    )
}

export default SudokuBoard;