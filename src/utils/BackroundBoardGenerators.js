import { AdvancedBoardGenerator, ExpertBoardGenerator } from "./BoardGenerator";

export const generateAdvancedBoard = async () => {
    let removedVals, startingBoard, finalBoard
    [removedVals, startingBoard, finalBoard] = await AdvancedBoardGenerator();
    return [removedVals, startingBoard, finalBoard];
}
  
export const generateExpertBoard = async () => { 
    let removedVals, startingBoard, finalBoard
    [removedVals, startingBoard, finalBoard] = await ExpertBoardGenerator();
    return [removedVals, startingBoard, finalBoard];
}

export const backupAdvancedBoards = async (advancedBoards) => {

    for(var i = 0; i < 5; i++) {
        let removedVals, startingBoard, finalBoard
        [removedVals, startingBoard, finalBoard] = await generateAdvancedBoard();
        advancedBoards.push({
          removedVals: removedVals,
          startingBoard: startingBoard,
          finalBoard: finalBoard
        });
    }
}

export const backupExpertBoards = async (expertBoards) => {

    for(var i = 0; i < 5; i++) {
        let removedVals, startingBoard, finalBoard
        [removedVals, startingBoard, finalBoard] = await generateExpertBoard();
        expertBoards.push({
          removedVals: removedVals,
          startingBoard: startingBoard,
          finalBoard: finalBoard
        });
      }
}



