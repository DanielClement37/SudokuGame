import React, { createContext, useReducer } from "react";
import GameReducer from './GameReducer';
//import BoardGenerator from '../utils/BoardGenerator'

const initialState = {
  BoardState: {},
  NotesMode: false,
  //other states 
};

export const GameContext = createContext(initialState);

export const GameContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(GameReducer,initialState);
    
    function initializeBoard(boardState) {
        dispatch({
            type: 'INITIALIZE_BOARD',
            payload: boardState,
        })
    }

    function addTile(boardState){
        dispatch({
            type:'ADD_TILE',
            payload: boardState
        })
    }

    return (
        <GameContext.Provider value={{
            boardState: state.boardValues,
            initializeBoard,
            addTile
        }}>
            {children}
        </GameContext.Provider>
    )
}