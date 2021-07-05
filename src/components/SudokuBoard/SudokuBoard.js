
import './SudokuBoard.css';
import React from 'react';
import BoardUnit from './SudokuUnit/BoardUnit';

const SudokuBoard = (props)=> {
    return (
        <div className="Board-container">
          <BoardUnit id="unit1" cols="123" rows="ABC"/>
          <BoardUnit id="unit2" cols="456" rows="ABC"/>
          <BoardUnit id="unit3" cols="789" rows="ABC"/>
          <BoardUnit id="unit4" cols="123" rows="DEF"/>
          <BoardUnit id="unit5" cols="456" rows="DEF"/>
          <BoardUnit id="unit6" cols="789" rows="DEF"/>
          <BoardUnit id="unit7" cols="123" rows="GHI"/>
          <BoardUnit id="unit8" cols="456" rows="GHI"/>
          <BoardUnit id="unit9" cols="789" rows="GHI"/>
        </div>
    )
}

export default SudokuBoard;