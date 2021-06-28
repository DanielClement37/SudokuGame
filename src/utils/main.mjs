
import {BeginnerBoardGenerator} from './BoardGenerator.mjs'

let [removedVals, startBoard, finalBoard] = BeginnerBoardGenerator();

for(var i = 0; i < 9; i++) {
    for(var j = 0; j < 9; j++) {
        console.log(startBoard[i][j]);
        console.log(" ");
    }
}