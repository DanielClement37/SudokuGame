import React, { createContext, useReducer } from "react";
import GameReducer from './GameReducer';

const initialState = {
  BoardState: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  NotesMode: false,
  //other states 
};

export const GameContext = createContext(initialState);

export const GameContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(GameReducer,initialState);
    
    function changeBoardState(boardState){
        dispatch({
            type:'CHANGE_BOARD',
            payload: boardState
        })
    }

    return (
        <GameContext.Provider value={{
            boardState: state.boardState,
            changeBoardState
        }}>
            {children}
        </GameContext.Provider>
    )
}