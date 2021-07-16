import React from "react";
import "./BoardUnit.css";
import Tile from "../SudokuTile/SudokuTile";
import { useStore } from "../../../store/Store";
import { actionTypes } from "../../../store/types";
import { getRowNum } from "../../../utils/Conveter";
import { classNames } from "../../../utils/classNames";

const BoardUnit = (props) => {
  const [state, dispatch] = useStore();
  const { boardState, selectedTile } = state;

  const selectTileHandler = (tileProps) => {
    dispatch({
      type: actionTypes.SELECT_TILE,
      selectedTile: {
        row: tileProps.row,
        col: tileProps.col,
        value: getValue(tileProps.row, tileProps.col),
        unit: props.id,
      },
    });
  };

  const getValue = (row, col) => {
    const rowNum = getRowNum(row);
    return boardState[rowNum - 1][col - 1];
  };
  
  const tiles = () => {
    const tileArray = [];

    for (let i = 0; i < 3; i++) {
      const row = props.rows.substring(i, i + 1);
      for (let j = 0; j < 3; j++) {
        const col = props.cols.substring(j, j + 1);
        const tileId = "tile" + row + col;
        const value = getValue(row, col);
        tileArray.push(
          <Tile
            row={row}
            col={col}
            tileId={tileId}
            value={value}
            selectTileHandler={selectTileHandler}
          />
        );
      }
    }
    return tileArray;
  };

  return (
    <div
      key={props.id}
      id={props.id}
      className={classNames(
        "board-unit",
        props.id === selectedTile.unit && "selected-unit-class"
      )}
    >
      {tiles()}
    </div>
  );
};

export default BoardUnit;
