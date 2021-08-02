import "./SudokuBoard.css";
import React from "react";
import BoardUnit from "./SudokuUnit/BoardUnit";

const SudokuBoard = (props) => {
  
  return (
    <div className="Board-container">
      <BoardUnit id="unit1" cols="123" rows="ABC" ref={props.ref}/>
      <BoardUnit id="unit2" cols="456" rows="ABC" ref={props.ref}/>
      <BoardUnit id="unit3" cols="789" rows="ABC" ref={props.ref}/>
      <BoardUnit id="unit4" cols="123" rows="DEF" ref={props.ref}/>
      <BoardUnit id="unit5" cols="456" rows="DEF" ref={props.ref}/>
      <BoardUnit id="unit6" cols="789" rows="DEF" ref={props.ref}/>
      <BoardUnit id="unit7" cols="123" rows="GHI" ref={props.ref}/>
      <BoardUnit id="unit8" cols="456" rows="GHI" ref={props.ref}/>
      <BoardUnit id="unit9" cols="789" rows="GHI" ref={props.ref}/>
    </div>
  );
};

export default SudokuBoard;
