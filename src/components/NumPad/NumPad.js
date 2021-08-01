import React from 'react'
import './NumPad.css'
import { useStore } from "../../store/Store";

const NumPad =(props) => {
    const [state] = useStore();
  const { remainingNums } = state;


    return (
        <div className="NumPad">
            <button className="circle-btn" onClick={(e)=>{props.btnHandler(1)}}>
                <span className="number-span">1</span>
                <span className="remaining-span">{remainingNums[0]}</span>
            </button>
            <button className="circle-btn" onClick={(e)=>{props.btnHandler(2)}}>
                <span className="number-span">2</span>
                <span className="remaining-span">{remainingNums[1]}</span>
            </button>
            <button className="circle-btn" onClick={(e)=>{props.btnHandler(3)}}>
                <span className="number-span">3</span>
                <span className="remaining-span">{remainingNums[2]}</span>
            </button>
            <button className="circle-btn" onClick={(e)=>{props.btnHandler(4)}}>
                <span className="number-span">4</span>
                <span className="remaining-span">{remainingNums[3]}</span>
            </button>
            <button className="circle-btn" onClick={(e)=>{props.btnHandler(5)}}>
                <span className="number-span">5</span>
                <span className="remaining-span">{remainingNums[4]}</span>
            </button>
            <button className="circle-btn" onClick={(e)=>{props.btnHandler(6)}}>
                <span className="number-span">6</span>
                <span className="remaining-span">{remainingNums[5]}</span>
            </button>
            <button className="circle-btn" onClick={(e)=>{props.btnHandler(7)}}>
                <span className="number-span">7</span>
                <span className="remaining-span">{remainingNums[6]}</span>
            </button>
            <button className="circle-btn" onClick={(e)=>{props.btnHandler(8)}}>
                <span className="number-span">8</span>
                <span className="remaining-span">{remainingNums[7]}</span>
            </button>
            <button className="circle-btn" onClick={(e)=>{props.btnHandler(9)}}>
                <span className="number-span">9</span>
                <span className="remaining-span">{remainingNums[8]}</span>
            </button>
        </div>
    )
}

export default NumPad;