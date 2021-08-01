import "./SudokuTile.css";
import "./RepetiveTile.css";
import React from "react";
import { useStore } from "../../../store/Store";
import { classNames } from "../../../utils/classNames.ts";
import { generatedCheck } from "../../../utils/GeneratedCheck";
import { getRowNum } from "../../../utils/Conveter";

const Tile = (props) => {
  const [state] = useStore();
  const { selectedTile, initBoardState, boardNotes } = state;

  let tileValue = props.value === 0 ? " " : props.value;
  let tile = {
    row: props.row,
    col: props.col,
  };
  
  const rowNum = getRowNum(props.row);
  
  if (props.value === 0) {
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
            props.value !== 0 && props.value === selectedTile.value
              ? "selected-value-class"
              : ""
          )}
        >
          <table className="cell-hints">
            <tbody>
              <tr>
                <td
                  className={classNames(
                    "hint-item",
                    boardNotes[rowNum-1][props.col-1][0] ? "selected-hint" : ""
                  )}
                >
                  1
                </td>{" "}
                <td
                  className={classNames(
                    "hint-item",
                    boardNotes[rowNum-1][props.col-1][1] ? "selected-hint" : ""
                  )}
                >
                  2
                </td>{" "}
                <td
                  className={classNames(
                    "hint-item",
                    boardNotes[rowNum-1][props.col-1][2] ? "selected-hint" : ""
                  )}
                >
                  3
                </td>
              </tr>{" "}
              <tr>
                <td
                  className={classNames(
                    "hint-item",
                    boardNotes[rowNum-1][props.col-1][3] ? "selected-hint" : ""
                  )}
                >
                  4
                </td>{" "}
                <td
                  className={classNames(
                    "hint-item",
                    boardNotes[rowNum-1][props.col-1][4] ? "selected-hint" : ""
                  )}
                >
                  5
                </td>{" "}
                <td
                  className={classNames(
                    "hint-item",
                    boardNotes[rowNum-1][props.col-1][5] ? "selected-hint" : ""
                  )}
                >
                  6
                </td>
              </tr>{" "}
              <tr>
                <td
                  className={classNames(
                    "hint-item",
                    boardNotes[rowNum-1][props.col-1][6] ? "selected-hint" : ""
                  )}
                >
                  7
                </td>{" "}
                <td
                  className={classNames(
                    "hint-item",
                    boardNotes[rowNum-1][props.col-1][7] ? "selected-hint" : ""
                  )}
                >
                  8
                </td>{" "}
                <td
                  className={classNames(
                    "hint-item",
                    boardNotes[rowNum-1][props.col-1][8] ? "selected-hint" : ""
                  )}
                >
                  9
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
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
  }
};

export default Tile;
