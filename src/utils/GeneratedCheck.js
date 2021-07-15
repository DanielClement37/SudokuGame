import { getRowNum } from "./Conveter";

export const generatedCheck = (tile, initBoardState) => {
  const rowNum = getRowNum(tile.row);
  if(initBoardState[rowNum -1][parseInt(tile.col) - 1] === 0){
    return false;
  }
  return true;
};
