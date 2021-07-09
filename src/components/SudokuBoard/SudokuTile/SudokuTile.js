import './SudokuTile.css';
import React from 'react'

const Tile = (props) => {
    
    let tileValue ='';
    if(props.value === 0){
        tileValue = ' ';
    }else {
        tileValue = props.value;
    }

    return (
        <div className="tile" id={props.tileId} onClick={(e)=>{props.selectTileHandler(props)}}>
            <div className="value-container">
                {tileValue}
            </div>
        </div>
    )
}

export default Tile;
