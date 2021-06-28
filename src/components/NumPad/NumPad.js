import React from 'react'
import './NumPad.css'

const NumPad =() => {
    return (
        <div className="NumPad">
            <div className="one-container">
                <span className="number-btn">1</span>
                <span className="remaining-lb">3</span>
            </div>
            <div className="two-container">
                <span className="number-btn">2</span>
                <span className="remaining-lb">3</span>
            </div>
            <div className="three-container">
                <span className="number-btn">3</span>
                <span className="remaining-lb">3</span>
            </div>
            <div className="four-container">
                <span className="number-btn">4</span>
                <span className="remaining-lb">3</span>
            </div>
            <div className="five-container">
                <span className="number-btn">5</span>
                <span className="remaining-lb">3</span>
            </div>
            <div className="six-container">
                <span className="number-btn">6</span>
                <span className="remaining-lb">3</span>
            </div>
            <div className="seven-container">
                <span className="number-btn">7</span>
                <span className="remaining-lb">3</span>
            </div>
            <div className="eight-container">
                <span className="number-btn">8</span>
                <span className="remaining-lb">3</span>
            </div>
            <div className="nine-container">
                <span className="number-btn">9</span>
                <span className="remaining-lb">3</span>
            </div>
        </div>
    )
}

export default NumPad;