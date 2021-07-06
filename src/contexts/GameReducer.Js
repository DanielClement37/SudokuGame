
function GameReducer(state,action){
    switch(action.type){
        case 'ADD_TILE':
            return{
                ...state,
                boardState:[action.payload, ...state.boardValues]
            }
        default:
            return state
    }
}

export default GameReducer;