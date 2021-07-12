import "./SudokuTile.css";
import React from "react";
import { useStore } from "../../../store/Store";
import { classNames } from "../../../utils/classNames.ts";

const Tile = (props) => {
  const [state] = useStore();
  const { selectedTile } = state;

  let tileValue = "";
  if (props.value === 0) {
    tileValue = " ";
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
            props.row === selectedTile.row && "selected-row-class",
            props.col === selectedTile.col && "selected-col-class"
          )}
        >
          {tileValue}
        </div>
      </div>
    );
  } else {
    tileValue = props.value;
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
            props.row === selectedTile.row &&
              props.col === selectedTile.col &&
              "selected-tile-class",
            props.row === selectedTile.row && "selected-row-class",
            props.col === selectedTile.col && "selected-col-class",
            props.value === selectedTile.value && "selected-value-class"
          )}
        >
          {tileValue}
        </div>
      </div>
    );
  }
};

export default Tile;
