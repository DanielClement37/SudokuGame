/* 
    Used to split up the board into a list with Key Identifiers, that way it will be 
    easier to handle / display on the front end. Will also store the value at that location.

    Written by Spencer Smith and Anna Fortenberry
*/

let BOARD_ID = []

BOARD_ID = [
    ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'],
    ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'],
    ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9'],
    ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9'],
    ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9'],
    ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9'],
    ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9'],
    ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9'],
    ['I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9']
];

const BLANK_BOARD = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];


var tileInfo = {
    "KEY_ID" : '',
    "value" : 2
}

/*
    This function creates a list of JSON objects, each apot in the list contains a Key Identifier and 
    a value that corresponds to that index. This makes it easier to handle on the front-end since we gave
    each tile a KEY_ID. We can easily display where the tile needs to go based on the KEY_ID.
*/
function createBoardList(board) {
    
    let counter = 0
    let boardList = []

    for(var i = 0; i < 9; i++) {
        for(var j = 0; j < 9; j++) {
            boardList.push({
                "KEY_ID" : BOARD_ID[i][j],
                "value" : board[i][j]
            })
            //boardList[counter].KEY_ID = BOARD_ID[i][j] //set the KEY_ID from the corresponding tile
            //boardList[counter].value = board[i][j] //set the value from the gameboard til
            //counter++ //increment the counter
        }
    }

    return boardList
}

let newList = createBoardList(BLANK_BOARD)

for(var i = 0; i < newList.length; i++) {
    console.log(newList.KEY_ID)
    console.log(newList.value)
}