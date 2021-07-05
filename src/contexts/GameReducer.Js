function GameReducer(state,action){
    switch(action.type){
        case 'CHANGE_BOARD':
            return{
                ...state,
                boardState:[action.payload, ...state.boardState]
            }
        default:
            return state
    }
}

export default GameReducer;