import React from 'react'
import './NumPad.css'

const NumPad =() => {
    return (
        <div className="NumPad">
            <button className="circle-btn">
                <span className="number-span">1</span>
                <span className="remaining-span">3</span>
            </button>
            <button className="circle-btn">
                <span className="number-span">2</span>
                <span className="remaining-span">3</span>
            </button>
            <button className="circle-btn">
                <span className="number-span">3</span>
                <span className="remaining-span">3</span>
            </button>
            <button className="circle-btn">
                <span className="number-span">4</span>
                <span className="remaining-span">3</span>
            </button>
            <button className="circle-btn">
                <span className="number-span">5</span>
                <span className="remaining-span">3</span>
            </button>
            <button className="circle-btn">
                <span className="number-span">6</span>
                <span className="remaining-span">3</span>
            </button>
            <button className="circle-btn">
                <span className="number-span">7</span>
                <span className="remaining-span">3</span>
            </button>
            <button className="circle-btn">
                <span className="number-span">8</span>
                <span className="remaining-span">3</span>
            </button>
            <button className="circle-btn">
                <span className="number-span">9</span>
                <span className="remaining-span">3</span>
            </button>
        </div>
    )
}

export default NumPad;