import React, { useContext } from "react";
import "./BoardUnit.css";
import Tile from "../SudokuTile/SudokuTile";
import { useStore } from "../../../store/Store";

const BoardUnit = (props) => {

    const [state] = useStore();
    const {boardState} = state;

  const getValue = (row, col) => {
    const rowNum = getRowNum(row);
    
    if(boardState[rowNum-1][col-1] === 0){
        return " "
    } else {
        return boardState[rowNum-1][col-1];
    }
    
  };

  const getRowNum = (row) => {
    switch (row) {
      case "A":
        return 1;
      case "B":
        return 2;
      case "C":
        return 3;
      case "D":
        return 4;
      case "E":
        return 5;
      case "F":
        return 6;
      case "G":
        return 7;
      case "H":
        return 8;
      case "I":
        return 9;
      default:
        break;
    }
  };

  const tiles = () => {
    const tileArray = [];

    for (let i = 0; i < 3; i++) {
      const row = props.rows.substring(i, i + 1);
      for (let j = 0; j < 3; j++) {
        const col = props.cols.substring(j, j + 1);
        const tileId = "tile" + row + col;
        const value = getValue(row,col);
        tileArray.push(
          <Tile row={row} col={col} tileId={tileId} value={value} />
        );
      }
    }
    return tileArray;
  };

  return (
    <div className="board-unit" id={props.id}>
      {tiles()}
    </div>
  );
};

export default BoardUnit;
