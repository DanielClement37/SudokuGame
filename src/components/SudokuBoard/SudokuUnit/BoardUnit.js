import React from 'react'
import './BoardUnit.css'
import Tile from '../SudokuTile/SudokuTile'

const BoardUnit = (props) => {
    
    const tiles = () => {
        const tileArray =[]

        for (let i = 0; i < 3; i++) {
            const row = props.rows.substring(i,i+1);
            for (let j = 0; j < 3; j++) {
                const col = props.cols.substring(j,j+1);
                const tileId = "tile" + row + col;
                tileArray.push(<Tile row={row} col={col} tileId={tileId}/>)
            }
        }
        return tileArray;
    }

    return (
        <div className="board-unit" id={props.id}>
            {tiles()}
        </div>
    )
}

export default BoardUnit;