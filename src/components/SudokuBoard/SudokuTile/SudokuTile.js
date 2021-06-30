import './SudokuTile.css';
import React from 'react'

const Tile = (props) => {
    return (
        <div className="tile" id={props.tileId}>
            <div className="value-container">

            </div>
        </div>
    )
}

export default Tile;
