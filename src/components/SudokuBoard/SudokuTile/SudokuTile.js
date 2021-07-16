import "./SudokuTile.css";
import React from "react";
import { useStore } from "../../../store/Store";
import { classNames } from "../../../utils/classNames.ts";
import { generatedCheck } from "../../../utils/GeneratedCheck";
const Tile = (props) => {
  const [state] = useStore();
  const { selectedTile, initBoardState } = state;

  let tileValue = props.value === 0 ? " " : props.value;
  let tile = {
    row: props.row,
    col: props.col,
  };

  return (
    <div
      className="tile"
      id={props.tileId}
      onClick={(e) => {
        props.selectTileHandler(props);
      }}
    >
      <div
        className={classNames(
          "value-container",
          generatedCheck(tile, initBoardState) ? "board-tile" : "user-tile",
          props.row === selectedTile.row &&
            props.col === selectedTile.col &&
            "selected-tile-class",
          props.row === selectedTile.row && "selected-row-class",
          props.col === selectedTile.col && "selected-col-class",
          props.value !== 0 && props.value === selectedTile.value
            ? "selected-value-class"
            : ""
        )}
      >
        {tileValue}
      </div>
    </div>
  );
};

export default Tile;
